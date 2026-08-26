import { NextResponse } from "next/server";
import { createLeadAndNotify } from "@/lib/leads";
import { createLeadSchema } from "@/lib/validators/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = createLeadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Datos inválidos.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const payload = parsed.data;
    const result = await createLeadAndNotify({
      name: payload.name,
      phone: payload.phone,
      email: payload.email || undefined,
      interest: payload.interest,
      message: payload.message,
      source: payload.source,
    });

    return NextResponse.json({
      ok: true,
      leadId: result.lead.id,
      status: result.lead.status,
      whatsappSent: result.whatsapp.agent.ok,
      whatsappError: result.whatsapp.agent.ok ? null : result.whatsapp.agent.error,
    });
  } catch (error) {
    console.error("[api/leads] error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "No se pudo procesar el lead.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Lead API ready. Use POST to create a lead.",
  });
}
