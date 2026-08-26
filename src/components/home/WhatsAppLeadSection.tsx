"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const interests = [
  "Comprar propiedad",
  "Alquilar propiedad",
  "Vender propiedad",
  "Invertir",
  "Agendar visita",
  "Otro",
];

type FormState = "idle" | "loading" | "success" | "error";

export function WhatsAppLeadSection() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hola Horizon, quiero recibir asesoría inmobiliaria.",
  )}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage(null);

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
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo enviar tu solicitud.");
      }

      setState("success");
      event.currentTarget.reset();
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Error inesperado.");
    }
  }

  return (
    <section id="whatsapp-demo" className="py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="WhatsApp Business"
            title="Habla con un asesor en minutos"
            description="Déjanos tus datos y te contactamos por WhatsApp. También puedes iniciar el chat directamente desde tu móvil."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="rounded-[32px] border border-black/[0.06] bg-white p-6 sm:p-8" delay={0.05}>
            {state === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="size-12 text-accent-dark" />
                <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">Solicitud recibida</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  Guardamos tu información y el equipo fue notificado. Si prefieres, también puedes
                  continuar la conversación por WhatsApp ahora mismo.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-demo-allow="true"
                  className="hz-btn-editorial hz-btn-editorial--dark mt-6"
                >
                  Abrir WhatsApp
                  <ArrowUpRight className="hz-btn-editorial__arrow size-4" strokeWidth={2.2} />
                </a>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="mt-3 text-sm font-medium text-muted transition hover:text-ink"
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
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">Interés</label>
                  <select name="interest" className="input-field" required defaultValue="">
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
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">Mensaje</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Cuéntanos qué tipo de propiedad buscas, zona y presupuesto."
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
                    "hz-btn-editorial hz-btn-editorial--dark w-full justify-center sm:w-auto",
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
                      Solicitar contacto por WhatsApp
                      <ArrowUpRight className="hz-btn-editorial__arrow size-4" strokeWidth={2.2} />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="hz-dark-panel relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(156,175,122,0.22),transparent_55%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                  <MessageCircle className="size-3.5" />
                  Atención inmediata
                </div>
                <h3 className="mt-5 font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-tight text-white">
                  Tu próximo paso puede ser un mensaje
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
                  Conectamos tu solicitud con WhatsApp Business API, guardamos el lead en base de datos
                  y notificamos al equipo para responder con rapidez.
                </p>
              </div>

              <div className="relative mt-8 space-y-4">
                <InfoRow icon={<Phone className="size-4" />} label="Teléfono" value={SITE.phone} />
                <InfoRow icon={<MessageCircle className="size-4" />} label="WhatsApp" value={SITE.whatsapp} />
                <InfoRow label="Horario" value={SITE.hours} />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-demo-allow="true"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,211,102,0.35)]"
                >
                  Chatear ahora en WhatsApp
                  <ArrowUpRight className="size-4" strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
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
      <label htmlFor={name} className="mb-1.5 block text-[12px] font-semibold text-[#555]">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className="input-field" />
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
    <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3.5">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-[14px] font-medium text-white/90">{value}</p>
    </div>
  );
}
