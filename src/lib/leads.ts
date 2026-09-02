import type { LeadSource } from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  notifyAgentAboutLead,
  sendCustomerLeadMessage,
} from "@/lib/whatsapp";

export type CreateLeadInput = {
  name: string;
  phone: string;
  email?: string;
  interest: string;
  message?: string;
  source?: LeadSource;
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

  const customerResult = await sendCustomerLeadMessage({
    phone: lead.phone,
    name: lead.name,
    interest: lead.interest,
    message: lead.message,
  });

  const agentResult = customerResult.ok
    ? await notifyAgentAboutLead({
        name: lead.name,
        phone: lead.phone,
        interest: lead.interest,
        message: lead.message,
      })
    : { ok: false as const, error: "Agent notification skipped because customer message failed.", skipped: true as const };

  const whatsappSent = customerResult.ok;
  const whatsappError = customerResult.ok
    ? agentResult.ok || "skipped" in agentResult
      ? null
      : agentResult.error
    : customerResult.error;

  const updatedLead = await prisma.lead.update({
    where: { id: lead.id },
    data: whatsappSent
      ? {
          status: "WHATSAPP_SENT",
          whatsappMessageId: customerResult.messageId,
          whatsappError,
        }
      : {
          status: "WHATSAPP_FAILED",
          whatsappError: customerResult.error,
        },
  });

  return {
    lead: updatedLead,
    whatsapp: {
      customer: customerResult,
      agent: agentResult,
    },
  };
}
