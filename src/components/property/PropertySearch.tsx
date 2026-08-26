"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export function PropertySearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [purpose, setPurpose] = useState<"sale" | "rent">("sale");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (priceMax) params.set("priceMax", priceMax);
    router.push(`/propiedades?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={
        compact
          ? "flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:flex-row sm:items-end"
          : "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-6"
      }
    >
      {!compact && (
        <div className="mb-4 flex gap-2">
          {(["sale", "rent"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPurpose(p)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${purpose === p ? "bg-ink text-white" : "bg-cream-dark text-ink hover:bg-cream"}`}
            >
              {p === "sale" ? "Comprar" : "Alquilar"}
            </button>
          ))}
        </div>
      )}

      <div className={compact ? "grid flex-1 gap-3 sm:grid-cols-4" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-5"}>
        {compact && (
          <Field label="Operación">
            <select value={purpose} onChange={(e) => setPurpose(e.target.value as "sale" | "rent")} className="input-field">
              <option value="sale">Comprar</option>
              <option value="rent">Alquilar</option>
            </select>
          </Field>
        )}
        <Field label="Ciudad">
          <select value={city} onChange={(e) => setCity(e.target.value)} className="input-field">
            <option value="">Todas</option>
            {["Santo Domingo", "Punta Cana", "Santiago", "La Romana", "Puerto Plata", "Bávaro"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Tipo">
          <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
            <option value="">Todos</option>
            <option value="house">Casa</option>
            <option value="apartment">Apartamento</option>
            <option value="villa">Villa</option>
            <option value="penthouse">Penthouse</option>
            <option value="land">Terreno</option>
          </select>
        </Field>
        <Field label="Precio máximo">
          <select value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="input-field">
            <option value="">Sin límite</option>
            <option value="150000">$150,000</option>
            <option value="300000">$300,000</option>
            <option value="500000">$500,000</option>
            <option value="1000000">$1,000,000</option>
          </select>
        </Field>
        <div className={compact ? "sm:col-span-1" : "lg:col-span-1"}>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90">
            <Search className="h-4 w-4" />
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-[#555]">{label}</label>
      {children}
    </div>
  );
}
