"use client";

import Link from "next/link";
import { properties } from "@/data";
import { useFavorites } from "@/context/FavoritesContext";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { formatPrice, propertyTypeLabel, purposeLabel } from "@/lib/utils";

export default function CompararPage() {
  const { compare, clearCompare } = useFavorites();
  const items = properties.filter((p) => compare.includes(p.id));

  const rows = [
    { label: "Precio", render: (p: typeof items[0]) => formatPrice(p.price, p.currency) },
    { label: "Ubicación", render: (p: typeof items[0]) => `${p.location.sector}, ${p.location.city}` },
    { label: "Tipo", render: (p: typeof items[0]) => propertyTypeLabel(p.type) },
    { label: "Operación", render: (p: typeof items[0]) => purposeLabel(p.purpose) },
    { label: "Habitaciones", render: (p: typeof items[0]) => String(p.bedrooms) },
    { label: "Baños", render: (p: typeof items[0]) => String(p.bathrooms) },
    { label: "Parqueos", render: (p: typeof items[0]) => String(p.parking) },
    { label: "Área", render: (p: typeof items[0]) => `${p.constructionArea} m²` },
    { label: "Año", render: (p: typeof items[0]) => String(p.yearBuilt ?? "—") },
  ];

  return (
    <SiteShell whatsapp={false}>
      <PageHero
        eyebrow="Comparador"
        title="Comparar propiedades"
        description="Selecciona hasta 4 propiedades para comparar características lado a lado."
      />
      <section className="container-site py-10 lg:py-14">
        {items.length < 2 ? (
          <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center">
            <p className="font-serif text-xl font-semibold text-ink">Selecciona al menos 2 propiedades para comparar.</p>
            <Link href="/propiedades" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white">
              Explorar propiedades
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <button onClick={clearCompare} className="text-[13px] font-semibold text-muted hover:text-ink">
                Limpiar comparación
              </button>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white">
              <table className="w-full min-w-[640px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-black/[0.06]">
                    <th className="p-4 font-semibold text-ink">Característica</th>
                    {items.map((p) => (
                      <th key={p.id} className="p-4 font-semibold text-ink">
                        <Link href={`/propiedad/${p.slug}`} className="hover:underline">{p.title}</Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-black/[0.04]">
                      <td className="p-4 font-medium text-muted">{row.label}</td>
                      {items.map((p) => (
                        <td key={p.id} className="p-4 text-ink">{row.render(p)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </SiteShell>
  );
}
