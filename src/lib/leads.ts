import type { LeadSource } from "@prisma/client";
import { SITE } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { notifyAgentAboutLead, sendLeadConfirmation } from "@/lib/whatsapp";

export type CreateLeadInput = {
  name: string;
  phone: string;
  email?: string;
  interest: string;
  message?: string;
  source?: LeadSource;
  notifyPhone?: string;
};

export async function createLeadAndNotify(input: CreateLeadInput) {
  const lead = await prisma.lead.create({
    data: {
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
      interest: input.interest.trim(),
      message: input.message?.trim() || null,
      source: input.source ?? "HOME",
      status: "PENDING",
    },
  });

  const agentResult = await notifyAgentAboutLead({
    name: lead.name,
    phone: lead.phone,
    interest: lead.interest,
    message: lead.message,
    notifyPhone: input.notifyPhone ?? SITE.whatsapp,
  });

  let confirmationResult:
    | { ok: true; skipped?: boolean; messageId?: string }
    | { ok: false; error: string } = { ok: true, skipped: true };

  if (agentResult.ok) {
    confirmationResult = await sendLeadConfirmation({
      phone: lead.phone,
      name: lead.name,
    });
  }

  const updatedLead = await prisma.lead.update({
    where: { id: lead.id },
    data: agentResult.ok
      ? {
          status: "WHATSAPP_SENT",
          whatsappMessageId: agentResult.messageId,
          whatsappError: confirmationResult.ok ? null : confirmationResult.error,
        }
      : {
          status: "WHATSAPP_FAILED",
          whatsappError: agentResult.error,
        },
  });

  return {
    lead: updatedLead,
    whatsapp: {
      agent: agentResult,
      confirmation: confirmationResult,
    },
  };
}
