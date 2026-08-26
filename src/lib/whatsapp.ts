import { getWhatsAppConfig } from "@/lib/env";
import { SITE } from "@/lib/constants";

type WhatsAppApiResponse = {
  messages?: Array<{ id: string }>;
  error?: {
    message?: string;
    type?: string;
    code?: number;
    error_subcode?: number;
  };
};

export type SendTemplateOptions = {
  to: string;
  templateName: string;
  languageCode?: string;
  bodyParameters?: string[];
};

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("1") && digits.length === 11) {
    return digits;
  }

  if (digits.length === 10) {
    return `1${digits}`;
  }

  return digits;
}

function buildTemplatePayload(options: SendTemplateOptions) {
  const components =
    options.bodyParameters && options.bodyParameters.length > 0
      ? [
          {
            type: "body",
            parameters: options.bodyParameters.map((text) => ({
              type: "text",
              text,
            })),
          },
        ]
      : undefined;

  return {
    messaging_product: "whatsapp",
    to: normalizePhone(options.to),
    type: "template",
    template: {
      name: options.templateName,
      language: { code: options.languageCode ?? "es" },
      ...(components ? { components } : {}),
    },
  };
}

export async function sendWhatsAppTemplate(
  options: SendTemplateOptions,
): Promise<{ ok: true; messageId: string } | { ok: false; error: string }> {
  const config = getWhatsAppConfig();

  try {
    const response = await fetch(
      `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildTemplatePayload(options)),
      },
    );

    const data = (await response.json()) as WhatsAppApiResponse;

    if (!response.ok) {
      return {
        ok: false,
        error: data.error?.message ?? `WhatsApp API error (${response.status})`,
      };
    }

    const messageId = data.messages?.[0]?.id;
    if (!messageId) {
      return { ok: false, error: "WhatsApp API did not return a message id." };
    }

    return { ok: true, messageId };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown WhatsApp error",
    };
  }
}

export async function notifyAgentAboutLead(input: {
  name: string;
  phone: string;
  interest: string;
  message?: string | null;
  notifyPhone?: string | null;
}) {
  const config = getWhatsAppConfig();
  const targetPhone = input.notifyPhone ?? config.notifyPhone ?? SITE.whatsapp;

  if (!targetPhone) {
    return {
      ok: false as const,
      error: "No notify phone configured.",
    };
  }

  const isHelloWorld = config.leadTemplate === "hello_world";

  return sendWhatsAppTemplate({
    to: targetPhone,
    templateName: config.leadTemplate,
    languageCode: isHelloWorld ? "en_US" : "es",
    bodyParameters: isHelloWorld
      ? undefined
      : [
          input.name,
          input.phone,
          input.interest,
          input.message?.trim() || "Sin mensaje adicional",
        ],
  });
}

export async function sendLeadConfirmation(input: {
  phone: string;
  name: string;
}) {
  const config = getWhatsAppConfig();

  if (!config.confirmationTemplate) {
    return { ok: true as const, skipped: true as const };
  }

  const result = await sendWhatsAppTemplate({
    to: input.phone,
    templateName: config.confirmationTemplate,
    languageCode: "es",
    bodyParameters: [input.name],
  });

  if (!result.ok) {
    return { ok: false as const, error: result.error };
  }

  return { ok: true as const, messageId: result.messageId };
}
