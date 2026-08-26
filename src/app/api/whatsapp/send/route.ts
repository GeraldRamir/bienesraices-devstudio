import { NextResponse } from "next/server";
import { sendWhatsAppTemplate } from "@/lib/whatsapp";
import { z } from "zod";

export const runtime = "nodejs";

const sendSchema = z.object({
  to: z.string().min(7),
  templateName: z.string().min(1),
  languageCode: z.string().default("es"),
  bodyParameters: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "Not available in production." }, { status: 403 });
  }

  try {
    const parsed = sendSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
    }

    const result = await sendWhatsAppTemplate(parsed.data);
    return NextResponse.json(result, { status: result.ok ? 200 : 502 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Send failed." },
      { status: 500 },
    );
  }
}
