"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bath, Bed, Heart, MapPin, Maximize, ParkingCircle } from "lucide-react";
import type { Property } from "@/types";
import { useFavorites } from "@/context/FavoritesContext";
import { cn, formatPrice, propertyTypeLabel, purposeLabel } from "@/lib/utils";

interface HomePropertyCardProps {
  property: Property;
  priority?: boolean;
  variant?: "default" | "luxury";
}

export function HomePropertyCard({
  property,
  priority = false,
  variant = "default",
}: HomePropertyCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(property.id);

  if (variant === "luxury") {
    return (
      <article className="hz-hover-card group relative">
        <Link href={`/propiedad/${property.slug}`} className="block overflow-hidden rounded-[28px]">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              priority={priority}
              sizes="(max-width:768px) 100vw, 33vw"
              className="hz-hover-card__media object-cover object-center"
            />
            <div className="hz-hover-card__overlay pointer-events-none absolute inset-0 bg-black/15" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/35 to-transparent hz-hover-card__gradient" />
            <div className="hz-hover-card__content absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div className="text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  {property.location.sector}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight">{property.title}</h3>
                <p className="mt-2 text-xl font-semibold">{formatPrice(property.price, property.currency)}</p>
              </div>
              <span
                className="hz-hover-card__arrow-btn grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink"
                aria-hidden
              >
                <ArrowUpRight className="hz-hover-card__arrow size-5" strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </Link>
        <FavoriteButton
          active={fav}
          onClick={() => toggleFavorite(property.id)}
          className="absolute right-4 top-4"
        />
      </article>
    );
  }

  return (
    <article className="hz-hover-card group relative">
      <Link href={`/propiedad/${property.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-cream-dark sm:aspect-[3/4]">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            priority={priority}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="hz-hover-card__media object-cover object-center"
          />
          <div className="hz-hover-card__overlay pointer-events-none absolute inset-0 bg-black/[0.06]" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="hz-pill bg-white/95 px-3 py-1.5 text-ink">{purposeLabel(property.purpose)}</span>
            {property.featured ? (
              <span className="hz-pill bg-ink px-3 py-1.5 text-white">Destacada</span>
            ) : null}
          </div>
          <span
            className="hz-hover-card__arrow-btn absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-black/10 bg-white text-ink"
            aria-hidden
          >
            <ArrowUpRight className="hz-hover-card__arrow size-[18px]" strokeWidth={2.2} />
          </span>
        </div>

        <div className="hz-hover-product__info border-b border-black/10 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            {propertyTypeLabel(property.type)}
          </p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="min-w-0 font-serif text-[17px] font-semibold leading-tight tracking-tight text-ink lg:text-[19px]">
              {property.title}
            </h3>
            <p className="shrink-0 text-[15px] font-semibold tabular-nums tracking-tight text-ink lg:text-base">
              {formatPrice(property.price, property.currency)}
              {property.purpose === "rent" ? (
                <span className="text-xs font-medium text-muted">/mes</span>
              ) : null}
            </p>
          </div>
          <p className="mt-2 flex items-center gap-1 text-[13px] text-muted">
            <MapPin className="size-3.5 shrink-0" />
            {property.location.sector}, {property.location.city}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-[#555]">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="size-3.5" />
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="size-3.5" />
                {property.bathrooms}
              </span>
            )}
            {property.parking > 0 && (
              <span className="flex items-center gap-1">
                <ParkingCircle className="size-3.5" />
                {property.parking}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize className="size-3.5" />
              {property.constructionArea} m²
            </span>
          </div>
        </div>
      </Link>
      <FavoriteButton
        active={fav}
        onClick={() => toggleFavorite(property.id)}
        className="absolute right-4 top-4"
      />
    </article>
  );
}

function FavoriteButton({
  active,
  onClick,
  className,
}: {
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-white/95 shadow-sm transition-colors hover:bg-white",
        className,
      )}
    >
      <Heart className={cn("size-4", active ? "fill-red-500 text-red-500" : "text-ink")} />
    </button>
  );
}

export function HomePropertyGrid({
  properties,
  variant = "default",
}: {
  properties: Property[];
  variant?: "default" | "luxury";
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property, index) => (
        <HomePropertyCard
          key={property.id}
          property={property}
          variant={variant}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
