import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().trim().min(2, "El nombre es requerido.").max(120),
  phone: z.string().trim().min(7, "El teléfono es requerido.").max(20),
  email: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Email inválido."),
  interest: z.string().trim().min(2, "Selecciona un interés.").max(80),
  message: z.string().trim().max(1000).optional(),
  source: z.enum(["HOME", "CONTACT", "PROPERTY", "WHATSAPP"]).default("HOME"),
});

export type CreateLeadPayload = z.infer<typeof createLeadSchema>;
