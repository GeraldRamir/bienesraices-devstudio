"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-2xl bg-cream p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-ink sm:text-2xl">
        Recibe nuevas propiedades y oportunidades de inversión
      </h3>
      <p className="mt-2 text-[14px] text-muted">
        Suscríbete para recibir alertas de propiedades exclusivas en tu bandeja.
      </p>
      {sent ? (
        <p className="mt-4 text-[14px] font-medium text-accent-dark">¡Gracias por suscribirte!</p>
      ) : (
        <form
          className="mt-5 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="flex-1 rounded-full border border-black/[0.1] bg-white px-5 py-3 text-[14px] outline-none focus:border-ink/30"
          />
          <button
            type="submit"
            className="rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Suscribirme
          </button>
        </form>
      )}
    </div>
  );
}
