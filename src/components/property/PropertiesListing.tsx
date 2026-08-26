"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Grid3X3, LayoutList, Map, SlidersHorizontal } from "lucide-react";
import { properties } from "@/data";
import type { PropertyFilters, PropertyPurpose, PropertyType, SortOption } from "@/types";
import { filterProperties, cn } from "@/lib/utils";
import { AdvancedFilters } from "./AdvancedFilters";
import { PropertyGrid } from "./PropertyCard";
import { PropertyMap } from "./PropertyMap";

type ViewMode = "grid" | "list" | "map";

interface PropertiesListingProps {
  initialFilters?: PropertyFilters;
  className?: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "area-desc", label: "Mayor área" },
  { value: "popular", label: "Más populares" },
];

export function PropertiesListing({ initialFilters = {}, className }: PropertiesListingProps) {
  const searchParams = useSearchParams();
  const urlFilters = useMemo((): PropertyFilters => {
    const p = searchParams;
    return {
      purpose: (p.get("purpose") as PropertyPurpose) || initialFilters.purpose,
      city: p.get("city") || initialFilters.city,
      type: (p.get("type") as PropertyType) || initialFilters.type,
      luxury: p.get("luxury") === "true" || initialFilters.luxury,
      priceMax: p.get("priceMax") ? Number(p.get("priceMax")) : initialFilters.priceMax,
      q: p.get("q") || initialFilters.q,
    };
  }, [searchParams, initialFilters]);

  const [filters, setFilters] = useState<PropertyFilters>(urlFilters);
  const [view, setView] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, ...urlFilters }));
  }, [urlFilters]);

  const filtered = useMemo(
    () => filterProperties(properties, filters),
    [filters]
  );

  const handleSortChange = (sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-2xl font-semibold text-ink">
            {filtered.length}{" "}
            {filtered.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
          </p>
          {filters.q && (
            <p className="mt-1 text-[14px] text-muted">
              Resultados para &ldquo;{filters.q}&rdquo;
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-semibold text-ink lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </button>

          <select
            value={filters.sort ?? "recent"}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-semibold text-ink outline-none"
            aria-label="Ordenar propiedades"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="flex rounded-full border border-black/[0.08] bg-white p-1">
            {(
              [
                { mode: "grid" as const, icon: Grid3X3, label: "Cuadrícula" },
                { mode: "list" as const, icon: LayoutList, label: "Lista" },
                { mode: "map" as const, icon: Map, label: "Mapa" },
              ] as const
            ).map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                aria-label={label}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  view === mode ? "bg-ink text-white" : "text-muted hover:text-ink"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div
          className={cn(
            "lg:block lg:w-72 lg:shrink-0",
            showFilters ? "block" : "hidden"
          )}
        >
          <AdvancedFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters({ sort: filters.sort })}
          />
        </div>

        <div className="min-w-0 flex-1">
          {view === "map" ? (
            filtered.length > 0 ? (
              <div className="space-y-4">
                <PropertyMap property={filtered[0]} />
                <p className="text-center text-[13px] text-muted">
                  Mostrando ubicación de referencia. Selecciona una propiedad en la lista para
                  ver detalles.
                </p>
                <PropertyGrid properties={filtered.slice(0, 3)} variant="list" />
              </div>
            ) : (
              <PropertyGrid properties={[]} />
            )
          ) : (
            <PropertyGrid
              properties={filtered}
              variant={view === "list" ? "list" : "grid"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
