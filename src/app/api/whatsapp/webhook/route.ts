import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getWhatsAppConfig } from "@/lib/env";

export const runtime = "nodejs";

type WhatsAppWebhookPayload = {
  object?: string;
  entry?: Array<{
    id?: string;
    changes?: Array<{
      field?: string;
      value?: {
        messaging_product?: string;
        metadata?: {
          display_phone_number?: string;
          phone_number_id?: string;
        };
        contacts?: Array<{
          profile?: { name?: string };
          wa_id?: string;
        }>;
        messages?: Array<{
          from?: string;
          id?: string;
          timestamp?: string;
          type?: string;
          text?: { body?: string };
        }>;
        statuses?: Array<{
          id?: string;
          status?: string;
          timestamp?: string;
          recipient_id?: string;
        }>;
      };
    }>;
  }>;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  let verifyToken: string;
  try {
    verifyToken = getWhatsAppConfig().verifyToken;
  } catch {
    return NextResponse.json({ error: "WhatsApp env not configured." }, { status: 500 });
  }

  if (mode === "subscribe" && token === verifyToken && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed." }, { status: 403 });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WhatsAppWebhookPayload;

    if (payload.object !== "whatsapp_business_account") {
      return NextResponse.json({ ok: true });
    }

    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value;
        if (!value) continue;

        for (const message of value.messages ?? []) {
          if (!message.id || !message.from) continue;

          await prisma.whatsAppInboundMessage.upsert({
            where: { waMessageId: message.id },
            update: {
              payload: message as object,
            },
            create: {
              waMessageId: message.id,
              fromPhone: message.from,
              messageType: message.type ?? "unknown",
              body: message.text?.body ?? null,
              payload: message as object,
            },
          });
        }

        for (const status of value.statuses ?? []) {
          if (!status.id) continue;

          await prisma.whatsAppInboundMessage.upsert({
            where: { waMessageId: status.id },
            update: {
              payload: status as object,
            },
            create: {
              waMessageId: status.id,
              fromPhone: status.recipient_id ?? "system",
              messageType: `status:${status.status ?? "unknown"}`,
              body: null,
              payload: status as object,
            },
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/whatsapp/webhook] error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
