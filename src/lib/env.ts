import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  WHATSAPP_PHONE_NUMBER_ID: z.string().min(1),
  WHATSAPP_BUSINESS_ACCOUNT_ID: z.string().min(1),
  WHATSAPP_ACCESS_TOKEN: z.string().min(1),
  WHATSAPP_VERIFY_TOKEN: z.string().min(1),
  WHATSAPP_API_VERSION: z.string().default("v21.0"),
  WHATSAPP_NOTIFY_PHONE: z.string().optional(),
  WHATSAPP_LEAD_TEMPLATE: z.string().default("hello_world"),
  WHATSAPP_CONFIRMATION_TEMPLATE: z.string().optional(),
});

export type ServerEnv = z.infer<typeof envSchema>;

let cachedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Missing or invalid environment variables: ${details}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

export function getWhatsAppConfig() {
  const env = getServerEnv();
  return {
    phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID,
    businessAccountId: env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    accessToken: env.WHATSAPP_ACCESS_TOKEN,
    verifyToken: env.WHATSAPP_VERIFY_TOKEN,
    apiVersion: env.WHATSAPP_API_VERSION,
    notifyPhone: env.WHATSAPP_NOTIFY_PHONE,
    leadTemplate: env.WHATSAPP_LEAD_TEMPLATE,
    confirmationTemplate: env.WHATSAPP_CONFIRMATION_TEMPLATE,
  };
}
