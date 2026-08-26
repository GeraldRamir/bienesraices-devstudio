"use client";

import { RotateCcw } from "lucide-react";
import type { PropertyFilters, PropertyPurpose, PropertyType } from "@/types";
import { CITIES } from "@/lib/constants";
import { cn, propertyTypeLabel } from "@/lib/utils";

interface AdvancedFiltersProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onReset?: () => void;
  className?: string;
}

const PROPERTY_TYPES: PropertyType[] = [
  "house",
  "apartment",
  "villa",
  "penthouse",
  "land",
  "commercial",
  "office",
  "luxury",
];

const BOOLEAN_FILTERS: {
  key: keyof PropertyFilters;
  label: string;
}[] = [
  { key: "furnished", label: "Amueblado" },
  { key: "pool", label: "Piscina" },
  { key: "balcony", label: "Balcón" },
  { key: "terrace", label: "Terraza" },
  { key: "security", label: "Seguridad" },
  { key: "elevator", label: "Ascensor" },
  { key: "seaView", label: "Vista al mar" },
  { key: "petFriendly", label: "Mascotas" },
  { key: "gatedCommunity", label: "Comunidad cerrada" },
  { key: "luxury", label: "Lujo" },
];

const inputClass =
  "w-full rounded-xl border border-black/[0.08] bg-cream px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-accent-dark";

export function AdvancedFilters({
  filters,
  onChange,
  onReset,
  className,
}: AdvancedFiltersProps) {
  const update = (partial: Partial<PropertyFilters>) => {
    onChange({ ...filters, ...partial });
  };

  const toggleBoolean = (key: keyof PropertyFilters) => {
    const current = filters[key];
    update({ [key]: current ? undefined : true });
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      onChange({});
    }
  };

  return (
    <aside
      className={cn(
        "rounded-2xl border border-black/[0.06] bg-white p-5 lg:sticky lg:top-24",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-ink">Filtros</h3>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-accent-dark hover:underline"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Limpiar
        </button>
      </div>

      <div className="mt-5 space-y-5">
        <FilterField label="Operación">
          <div className="flex gap-2">
            {(["sale", "rent"] as PropertyPurpose[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() =>
                  update({ purpose: filters.purpose === p ? undefined : p })
                }
                className={cn(
                  "flex-1 rounded-full py-2 text-[12px] font-semibold transition-colors",
                  filters.purpose === p
                    ? "bg-ink text-white"
                    : "bg-cream text-ink hover:bg-cream-dark"
                )}
              >
                {p === "sale" ? "Venta" : "Alquiler"}
              </button>
            ))}
          </div>
        </FilterField>

        <FilterField label="Ciudad">
          <select
            value={filters.city ?? ""}
            onChange={(e) => update({ city: e.target.value || undefined })}
            className={inputClass}
          >
            <option value="">Todas</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Tipo de propiedad">
          <select
            value={filters.type ?? ""}
            onChange={(e) =>
              update({ type: (e.target.value as PropertyType) || undefined })
            }
            className={inputClass}
          >
            <option value="">Todos</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {propertyTypeLabel(type)}
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Precio mínimo (USD)">
          <input
            type="number"
            min={0}
            placeholder="Sin mínimo"
            value={filters.priceMin ?? ""}
            onChange={(e) =>
              update({
                priceMin: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Precio máximo (USD)">
          <input
            type="number"
            min={0}
            placeholder="Sin máximo"
            value={filters.priceMax ?? ""}
            onChange={(e) =>
              update({
                priceMax: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Habitaciones (mín.)">
          <select
            value={filters.bedrooms ?? ""}
            onChange={(e) =>
              update({
                bedrooms: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className={inputClass}
          >
            <option value="">Cualquiera</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Baños (mín.)">
          <select
            value={filters.bathrooms ?? ""}
            onChange={(e) =>
              update({
                bathrooms: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className={inputClass}
          >
            <option value="">Cualquiera</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Parqueos (mín.)">
          <select
            value={filters.parking ?? ""}
            onChange={(e) =>
              update({
                parking: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className={inputClass}
          >
            <option value="">Cualquiera</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Área mínima (m²)">
          <input
            type="number"
            min={0}
            placeholder="Sin mínimo"
            value={filters.areaMin ?? ""}
            onChange={(e) =>
              update({
                areaMin: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Área máxima (m²)">
          <input
            type="number"
            min={0}
            placeholder="Sin máximo"
            value={filters.areaMax ?? ""}
            onChange={(e) =>
              update({
                areaMax: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className={inputClass}
          />
        </FilterField>

        <div>
          <p className="mb-2 text-[12px] font-semibold text-muted">Características</p>
          <div className="flex flex-wrap gap-2">
            {BOOLEAN_FILTERS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleBoolean(key)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors",
                  filters[key]
                    ? "bg-accent-dark text-white"
                    : "bg-cream text-ink hover:bg-cream-dark"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-muted">{label}</label>
      {children}
    </div>
  );
}
