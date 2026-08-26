"use client";

import { useState } from "react";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";

export default function PublicarPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Propietarios"
        title="Publica tu propiedad"
        description="Llega a miles de compradores calificados con la exposición premium de Horizon."
      />
      <section className="container-site max-w-2xl py-10 lg:py-14">
        <form className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <p className="font-medium text-accent-dark">¡Solicitud recibida! Un asesor te contactará pronto.</p>
          ) : (
            <>
              {["Nombre", "Teléfono", "Email", "Ubicación"].map((label) => (
                <div key={label} className="mb-4">
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">{label}</label>
                  <input required className="input-field" type={label === "Email" ? "email" : label === "Teléfono" ? "tel" : "text"} />
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
                  <option>Local comercial</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">Descripción</label>
                <textarea rows={4} className="input-field resize-none" required />
              </div>
              <button type="submit" className="w-full rounded-full bg-ink py-3 text-[14px] font-semibold text-white">
                Enviar solicitud
              </button>
            </>
          )}
        </form>
      </section>
    </SiteShell>
  );
}
