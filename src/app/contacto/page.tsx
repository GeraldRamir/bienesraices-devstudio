"use client";

import { useState } from "react";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { SITE } from "@/lib/constants";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappWarning, setWhatsappWarning] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setWhatsappWarning(null);

    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          phone: form.get("phone"),
          email: form.get("email"),
          interest: form.get("reason"),
          message: form.get("message"),
          source: "CONTACT",
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        whatsappSent?: boolean;
        whatsappError?: string | null;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo enviar el mensaje.");
      }

      if (!data.whatsappSent && data.whatsappError) {
        setWhatsappWarning(data.whatsappError);
      }

      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteShell>
      <PageHero
        eyebrow="Contacto"
        title="Estamos aquí para ayudarte"
        description="Cuéntanos qué buscas y un asesor especializado te contactará a la brevedad."
      />
      <section className="container-site py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <form
            className="rounded-[28px] border border-black/[0.06] bg-white p-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            {sent ? (
              <div className="space-y-3">
                <p className="text-[15px] font-medium text-accent-dark">
                  ¡Mensaje enviado! Te contactaremos pronto por WhatsApp o teléfono.
                </p>
                {whatsappWarning ? (
                  <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    {whatsappWarning}
                  </p>
                ) : null}
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre" name="firstName" required />
                  <Field label="Apellido" name="lastName" required />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Teléfono" name="phone" type="tel" required />
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">Motivo</label>
                  <select name="reason" className="input-field" required defaultValue="">
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option>Comprar</option>
                    <option>Alquilar</option>
                    <option>Vender</option>
                    <option>Invertir</option>
                    <option>Agendar visita</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">Mensaje</label>
                  <textarea name="message" rows={5} className="input-field resize-none" required />
                </div>
                {error ? (
                  <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-[14px] font-semibold text-white disabled:opacity-80"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar mensaje"
                  )}
                </button>
              </>
            )}
          </form>

          <div className="space-y-6">
            <InfoCard icon={<MapPin className="h-5 w-5" />} title="Dirección" text={SITE.address} />
            <InfoCard icon={<Phone className="h-5 w-5" />} title="Teléfono" text={SITE.phone} />
            <InfoCard icon={<Mail className="h-5 w-5" />} title="Email" text={SITE.email} />
            <div className="rounded-[28px] bg-cream p-6">
              <h3 className="font-semibold text-ink">Horario</h3>
              <p className="mt-2 text-[14px] text-muted">{SITE.hours}</p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-[28px] bg-cream-dark">
              <iframe
                title="Mapa de ubicación"
                src="https://maps.google.com/maps?q=Piantini+Santo+Domingo&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
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

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-[28px] border border-black/[0.06] bg-white p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-dark text-ink">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-[14px] text-muted">{text}</p>
      </div>
    </div>
  );
}
