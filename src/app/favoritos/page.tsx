"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { properties } from "@/data";
import { useFavorites } from "@/context/FavoritesContext";
import { PropertyGrid } from "@/components/property/PropertyCard";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";

export default function FavoritosPage() {
  const { favorites } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  return (
    <SiteShell whatsapp={false}>
      <PageHero
        eyebrow="Guardados"
        title="Mis favoritos"
        description="Propiedades que has guardado para revisar más tarde."
      />
      <section className="container-site py-10 lg:py-14">
        {saved.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center">
            <Heart className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-4 font-serif text-xl font-semibold text-ink">
              No tienes propiedades guardadas todavía.
            </p>
            <Link href="/propiedades" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white">
              Explorar propiedades
            </Link>
          </div>
        ) : (
          <PropertyGrid properties={saved} />
        )}
      </section>
    </SiteShell>
  );
}
