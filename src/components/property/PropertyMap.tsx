"use client";

import { MapPin, Navigation } from "lucide-react";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";

interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
}

interface PropertyMapProps {
  property: Property;
  nearbyPlaces?: NearbyPlace[];
  className?: string;
}

const DEFAULT_NEARBY: NearbyPlace[] = [
  { name: "Supermercado Nacional", type: "Comercio", distance: "350 m" },
  { name: "Centro médico", type: "Salud", distance: "800 m" },
  { name: "Colegio bilingüe", type: "Educación", distance: "1.2 km" },
  { name: "Parque recreativo", type: "Recreación", distance: "600 m" },
];

export function PropertyMap({
  property,
  nearbyPlaces = DEFAULT_NEARBY,
  className,
}: PropertyMapProps) {
  const { lat, lng } = property.location;
  const hasCoords = lat != null && lng != null;

  const mapsUrl = hasCoords
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : `https://www.google.com/maps/search/${encodeURIComponent(
        `${property.location.sector}, ${property.location.city}`
      )}`;

  return (
    <div className={cn("rounded-2xl border border-black/[0.06] bg-white p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-semibold text-ink">Ubicación</h3>
          <p className="mt-1 flex items-center gap-1.5 text-[14px] text-muted">
            <MapPin className="h-4 w-4 shrink-0" />
            {property.location.sector}, {property.location.city},{" "}
            {property.location.province}
          </p>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:bg-cream"
        >
          <Navigation className="h-3.5 w-3.5" />
          Cómo llegar
        </a>
      </div>

      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-cream-dark">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span className="absolute -inset-4 animate-ping rounded-full bg-accent-dark/20" />
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent-dark text-white shadow-lg">
              <MapPin className="h-5 w-5" />
            </span>
          </div>
        </div>
        {hasCoords && (
          <p className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-medium text-muted backdrop-blur-sm">
            {lat!.toFixed(4)}, {lng!.toFixed(4)}
          </p>
        )}
      </div>

      {nearbyPlaces.length > 0 && (
        <div className="mt-5">
          <h4 className="text-[13px] font-semibold uppercase tracking-wider text-muted">
            Lugares cercanos
          </h4>
          <ul className="mt-3 space-y-2">
            {nearbyPlaces.map((place) => (
              <li
                key={place.name}
                className="flex items-center justify-between rounded-xl bg-cream px-4 py-2.5 text-[14px]"
              >
                <div>
                  <p className="font-medium text-ink">{place.name}</p>
                  <p className="text-[12px] text-muted">{place.type}</p>
                </div>
                <span className="text-[12px] font-semibold text-accent-dark">
                  {place.distance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
