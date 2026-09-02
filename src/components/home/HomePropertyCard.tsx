"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Heart, MapPin, Maximize, ParkingCircle } from "lucide-react";
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
      <article className="pf-card pf-card--elevated group relative overflow-hidden">
        <Link href={`/propiedad/${property.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              priority={priority}
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="pf-tag bg-white/15 text-white">{property.location.sector}</span>
              <h3 className="mt-2 text-xl font-bold leading-snug text-white">{property.title}</h3>
              <p className="mt-1 text-lg font-bold text-white">
                {formatPrice(property.price, property.currency)}
              </p>
            </div>
          </div>
        </Link>
        <FavoriteButton
          active={fav}
          onClick={() => toggleFavorite(property.id)}
          className="absolute right-4 top-4"
          dark
        />
      </article>
    );
  }

  return (
    <article className="pf-card pf-card--white pf-card--elevated group relative">
      <Link href={`/propiedad/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#ebebea]">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            priority={priority}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover object-center"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="pf-tag bg-white text-ink shadow-sm">{purposeLabel(property.purpose)}</span>
            {property.featured ? (
              <span className="pf-tag bg-ink text-white">Destacada</span>
            ) : null}
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {propertyTypeLabel(property.type)}
              </p>
              <h3 className="mt-1.5 text-[16px] font-bold leading-snug tracking-[-0.01em] text-ink">
                {property.title}
              </h3>
            </div>
            <p className="shrink-0 text-[16px] font-bold tabular-nums text-ink">
              {formatPrice(property.price, property.currency)}
              {property.purpose === "rent" ? (
                <span className="text-xs font-medium text-muted">/mes</span>
              ) : null}
            </p>
          </div>

          <p className="flex items-center gap-1.5 text-[14px] text-muted">
            <MapPin className="size-3.5 shrink-0" />
            {property.location.sector}, {property.location.city}
          </p>

          <div className="flex flex-wrap items-center gap-4 border-t border-black/[0.06] pt-4 text-[13px] font-medium text-[#555]">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bed className="size-4 text-accent-dark" />
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath className="size-4 text-accent-dark" />
                {property.bathrooms}
              </span>
            )}
            {property.parking > 0 && (
              <span className="flex items-center gap-1.5">
                <ParkingCircle className="size-4 text-accent-dark" />
                {property.parking}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Maximize className="size-4 text-accent-dark" />
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
  dark = false,
}: {
  active: boolean;
  onClick: () => void;
  className?: string;
  dark?: boolean;
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={cn(
        "flex size-10 items-center justify-center rounded-full transition-colors",
        dark
          ? "bg-black/30 text-white hover:bg-black/50"
          : "bg-white text-ink shadow-sm hover:bg-white",
        className,
      )}
    >
      <Heart className={cn("size-4", active ? "fill-red-500 text-red-500" : "")} />
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
