import { getWhatsAppConfig } from "@/lib/env";

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

function formatWhatsAppError(data: WhatsAppApiResponse, status: number): string {
  const message = data.error?.message ?? `WhatsApp API error (${status})`;
  const code = data.error?.code;

  if (code === 190) {
    return `${message} Renueva WHATSAPP_ACCESS_TOKEN en Meta y Vercel.`;
  }

  if (code === 131030) {
    return `${message} Agrega el número del cliente como destinatario de prueba en Meta → WhatsApp → API Setup.`;
  }

  return message;
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
      const error = formatWhatsAppError(data, response.status);
      console.error("[whatsapp] send failed:", error, data.error);
      return { ok: false, error };
    }

    const messageId = data.messages?.[0]?.id;
    if (!messageId) {
      return { ok: false, error: "WhatsApp API did not return a message id." };
    }

    return { ok: true, messageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown WhatsApp error";
    console.error("[whatsapp] send error:", message);
    return { ok: false, error: message };
  }
}

function getCustomerTemplateConfig() {
  const config = getWhatsAppConfig();
  const templateName = config.confirmationTemplate ?? config.leadTemplate;
  const isHelloWorld = templateName === "hello_world";

  return {
    templateName,
    languageCode: isHelloWorld ? "en_US" : "es",
    bodyParameters: isHelloWorld
      ? undefined
      : undefined as string[] | undefined,
  };
}

function getAgentTemplateConfig() {
  const config = getWhatsAppConfig();
  const templateName = config.agentTemplate ?? config.leadTemplate;
  const isHelloWorld = templateName === "hello_world";

  return {
    templateName,
    languageCode: isHelloWorld ? "en_US" : "es",
    usesBodyParams: !isHelloWorld,
  };
}

export async function sendCustomerLeadMessage(input: {
  phone: string;
  name: string;
  interest: string;
  message?: string | null;
}) {
  const config = getCustomerTemplateConfig();
  const templateName = config.templateName;
  const isHelloWorld = templateName === "hello_world";

  return sendWhatsAppTemplate({
    to: input.phone,
    templateName,
    languageCode: config.languageCode,
    bodyParameters: isHelloWorld
      ? undefined
      : [input.name, input.interest, input.message?.trim() || "Sin mensaje adicional"],
  });
}

export async function notifyAgentAboutLead(input: {
  name: string;
  phone: string;
  interest: string;
  message?: string | null;
}) {
  const config = getWhatsAppConfig();
  const notifyPhone = config.notifyPhone;

  if (!notifyPhone) {
    return { ok: true as const, skipped: true as const };
  }

  const agentTemplate = getAgentTemplateConfig();

  return sendWhatsAppTemplate({
    to: notifyPhone,
    templateName: agentTemplate.templateName,
    languageCode: agentTemplate.languageCode,
    bodyParameters: agentTemplate.usesBodyParams
      ? [
          input.name,
          input.phone,
          input.interest,
          input.message?.trim() || "Sin mensaje adicional",
        ]
      : undefined,
  });
}
