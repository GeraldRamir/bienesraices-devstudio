"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { HomeSection } from "./HomeSection";

const interests = [
  "Comprar propiedad",
  "Alquilar propiedad",
  "Vender propiedad",
  "Invertir",
  "Agendar visita",
  "Otro",
];

type FormState = "idle" | "loading" | "success" | "partial" | "error";

export function WhatsAppLeadSection() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [whatsappWarning, setWhatsappWarning] = useState<string | null>(null);

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hola Horizon, quiero recibir asesoría inmobiliaria.",
  )}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage(null);
    setWhatsappWarning(null);

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email") || undefined,
          interest: form.get("interest"),
          message: form.get("message") || undefined,
          source: "HOME",
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        whatsappSent?: boolean;
        whatsappError?: string | null;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo enviar tu solicitud.");
      }

      if (data.whatsappSent) {
        setState("success");
        return;
      }

      setWhatsappWarning(
        data.whatsappError ??
          "Guardamos tu solicitud, pero WhatsApp no pudo enviarse. Revisa el token en Meta/Vercel.",
      );
      setState("partial");
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Error inesperado.");
    }
  }

  return (
    <HomeSection id="whatsapp-demo" variant="white">
      <SectionHeader
        eyebrow="Contacto directo"
        title="Habla con un asesor hoy"
        description="Completa el formulario o inicia una conversación por WhatsApp. Respuesta en minutos."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="pf-card pf-card--white pf-card--elevated p-6 sm:p-8">
          {state === "success" || state === "partial" ? (
            <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
              <CheckCircle2
                className={cn("size-10", state === "success" ? "text-accent-dark" : "text-amber-500")}
              />
              <h3 className="mt-4 text-xl font-bold text-ink">
                {state === "success" ? "Solicitud recibida" : "Solicitud guardada"}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                {state === "success"
                  ? "Te contactaremos por WhatsApp a la brevedad. También puedes continuar la conversación ahora."
                  : "Guardamos tu información correctamente."}
              </p>
              {whatsappWarning ? (
                <p className="mt-4 max-w-md rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">
                  {whatsappWarning}
                </p>
              ) : null}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-demo-allow="true"
                className="pf-btn pf-btn--primary mt-6"
              >
                Abrir WhatsApp
                <ArrowUpRight className="size-4" strokeWidth={2.2} />
              </a>
              <button
                type="button"
                onClick={() => {
                  setState("idle");
                  setWhatsappWarning(null);
                }}
                className="mt-3 text-sm font-medium text-muted hover:text-ink"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre completo" name="name" required />
                <Field label="Teléfono / WhatsApp" name="phone" type="tel" required />
              </div>
              <Field label="Email (opcional)" name="email" type="email" />
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#555]">Interés</label>
                <select name="interest" className="input-field rounded-2xl bg-[#f5f5f3]" required defaultValue="">
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {interests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#555]">Mensaje</label>
                <textarea
                  name="message"
                  rows={4}
                  className="input-field resize-none rounded-2xl bg-[#f5f5f3]"
                  placeholder="Tipo de propiedad, zona y presupuesto aproximado."
                />
              </div>

              {state === "error" && errorMessage ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={state === "loading"}
                className={cn(
                  "pf-btn pf-btn--primary w-full justify-center sm:w-auto",
                  state === "loading" && "pointer-events-none opacity-80",
                )}
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Solicitar contacto
                    <ArrowUpRight className="size-4" strokeWidth={2.2} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="pf-panel-dark relative flex min-h-[380px] flex-col justify-between overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(156,175,122,0.2),transparent_55%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
              <MessageCircle className="size-3.5" />
              Atención inmediata
            </div>
            <h3 className="mt-5 text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight text-white">
              Tu próximo paso puede ser un mensaje
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
              Conectamos tu solicitud con WhatsApp Business, guardamos el lead y notificamos al
              equipo para responder con rapidez.
            </p>
          </div>

          <div className="relative mt-8 space-y-3">
            <InfoRow icon={<Phone className="size-4" />} label="Teléfono" value={SITE.phone} />
            <InfoRow icon={<MessageCircle className="size-4" />} label="WhatsApp" value={SITE.whatsapp} />
            <InfoRow label="Horario" value={SITE.hours} />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-demo-allow="true"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#20bd5a]"
            >
              Chatear en WhatsApp
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-semibold text-[#555]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="input-field rounded-2xl bg-[#f5f5f3]"
      />
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-[14px] font-medium text-white/90">{value}</p>
    </div>
  );
}
