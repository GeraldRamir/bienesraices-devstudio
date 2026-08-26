"use client";

import { useState } from "react";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";

export default function ValoracionPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Vendedores"
        title="Solicitar valoración de propiedad"
        description="Obtén una estimación profesional del valor de mercado de tu propiedad."
      />
      <section className="container-site max-w-2xl py-10 lg:py-14">
        <form className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <p className="font-medium text-accent-dark">¡Gracias! Programaremos tu valoración gratuita.</p>
          ) : (
            <>
              {[
                { label: "Nombre", type: "text" },
                { label: "Teléfono", type: "tel" },
                { label: "Email", type: "email" },
                { label: "Ubicación", type: "text" },
                { label: "Precio estimado (opcional)", type: "text" },
              ].map((f) => (
                <div key={f.label} className="mb-4">
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">{f.label}</label>
                  <input className="input-field" type={f.type} required={!f.label.includes("opcional")} />
                </div>
              ))}
              <div className="mb-4">
                <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">Tipo de propiedad</label>
                <select className="input-field" required>
                  <option value="">Seleccionar</option>
                  <option>Casa</option>
                  <option>Apartamento</option>
                  <option>Villa</option>
                  <option>Terreno</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">Mensaje</label>
                <textarea rows={4} className="input-field resize-none" />
              </div>
              <button type="submit" className="w-full rounded-full bg-ink py-3 text-[14px] font-semibold text-white">
                Solicitar valoración
              </button>
            </>
          )}
        </form>
      </section>
    </SiteShell>
  );
}
