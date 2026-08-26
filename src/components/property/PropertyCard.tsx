"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Heart, MapPin, Maximize, ParkingCircle } from "lucide-react";
import type { Property } from "@/types";
import { useFavorites } from "@/context/FavoritesContext";
import { cn, formatPrice, propertyTypeLabel, purposeLabel } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  variant?: "grid" | "list" | "luxury";
  priority?: boolean;
}

export function PropertyCard({ property, variant = "grid", priority }: PropertyCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(property.id);

  if (variant === "list") {
    return (
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:flex-row">
        <Link href={`/propiedad/${property.slug}`} className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:w-72">
          <Image src={property.images[0]} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 288px" priority={priority} />
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <CardContent property={property} />
        </div>
        <FavoriteButton active={fav} onClick={() => toggleFavorite(property.id)} className="absolute right-3 top-3" />
      </article>
    );
  }

  if (variant === "luxury") {
    return (
      <article className="group relative overflow-hidden rounded-2xl">
        <Link href={`/propiedad/${property.slug}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={property.images[0]} alt={property.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" priority={priority} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-[12px] font-medium uppercase tracking-wider text-white/70">{property.location.sector}</p>
              <h3 className="mt-1 font-serif text-2xl font-semibold">{property.title}</h3>
              <p className="mt-2 text-xl font-semibold">{formatPrice(property.price, property.currency)}</p>
            </div>
          </div>
        </Link>
        <FavoriteButton active={fav} onClick={() => toggleFavorite(property.id)} className="absolute right-4 top-4 bg-white/90" />
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <Link href={`/propiedad/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={property.images[0]} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" priority={priority} />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink">{purposeLabel(property.purpose)}</span>
            {property.featured && <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">Destacada</span>}
          </div>
        </div>
        <div className="p-4">
          <CardContent property={property} compact />
        </div>
      </Link>
      <FavoriteButton active={fav} onClick={() => toggleFavorite(property.id)} className="absolute right-3 top-3" />
    </article>
  );
}

function CardContent({ property, compact }: { property: Property; compact?: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xl font-semibold text-ink">{formatPrice(property.price, property.currency)}{property.purpose === "rent" && <span className="text-sm font-medium text-muted">/mes</span>}</p>
          <h3 className={cn("mt-1 font-semibold text-ink", compact ? "text-[15px] line-clamp-1" : "text-lg")}>{property.title}</h3>
        </div>
      </div>
      <p className="mt-1.5 flex items-center gap-1 text-[13px] text-muted">
        <MapPin className="h-3.5 w-3.5 shrink-0" />
        {property.location.sector}, {property.location.city}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-[#555]">
        {property.bedrooms > 0 && <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{property.bedrooms}</span>}
        {property.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{property.bathrooms}</span>}
        {property.parking > 0 && <span className="flex items-center gap-1"><ParkingCircle className="h-3.5 w-3.5" />{property.parking}</span>}
        <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" />{property.constructionArea} m²</span>
      </div>
      {!compact && <p className="mt-2 text-[12px] font-medium text-muted">{propertyTypeLabel(property.type)}</p>}
    </>
  );
}

function FavoriteButton({ active, onClick, className }: { active: boolean; onClick: () => void; className?: string }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); onClick(); }}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={cn("flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition-colors hover:bg-white", className)}
    >
      <Heart className={cn("h-4 w-4", active ? "fill-red-500 text-red-500" : "text-ink")} />
    </button>
  );
}

export function PropertyGrid({ properties, variant = "grid" }: { properties: Property[]; variant?: "grid" | "list" | "luxury" }) {
  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center">
        <p className="font-serif text-xl font-semibold text-ink">No encontramos propiedades con estos filtros.</p>
        <p className="mt-2 text-[14px] text-muted">Prueba ajustando tu búsqueda o explora todas las propiedades.</p>
      </div>
    );
  }

  if (variant === "list") {
    return <div className="space-y-4">{properties.map((p) => <PropertyCard key={p.id} property={p} variant="list" />)}</div>;
  }

  if (variant === "luxury") {
    return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{properties.map((p) => <PropertyCard key={p.id} property={p} variant="luxury" />)}</div>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((p, i) => <PropertyCard key={p.id} property={p} priority={i < 3} />)}
    </div>
  );
}
