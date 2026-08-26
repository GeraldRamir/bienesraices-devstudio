import {
  Bath,
  Bed,
  Building2,
  Calendar,
  Layers,
  Maximize,
  ParkingCircle,
  Ruler,
} from "lucide-react";
import type { Property } from "@/types";
import { formatArea } from "@/lib/utils";

interface PropertyFeaturesProps {
  property: Property;
}

interface FeatureItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function PropertyFeatures({ property }: PropertyFeaturesProps) {
  const features: FeatureItem[] = [
    {
      icon: <Bed className="h-5 w-5" />,
      label: "Habitaciones",
      value: property.bedrooms > 0 ? String(property.bedrooms) : "—",
    },
    {
      icon: <Bath className="h-5 w-5" />,
      label: "Baños",
      value: property.bathrooms > 0 ? String(property.bathrooms) : "—",
    },
    {
      icon: <ParkingCircle className="h-5 w-5" />,
      label: "Parqueos",
      value: property.parking > 0 ? String(property.parking) : "—",
    },
    {
      icon: <Maximize className="h-5 w-5" />,
      label: "Área construcción",
      value: formatArea(property.constructionArea),
    },
  ];

  if (property.landArea && property.landArea > 0) {
    features.push({
      icon: <Ruler className="h-5 w-5" />,
      label: "Área terreno",
      value: formatArea(property.landArea),
    });
  }

  if (property.floors) {
    features.push({
      icon: <Layers className="h-5 w-5" />,
      label: "Niveles",
      value: String(property.floors),
    });
  }

  if (property.yearBuilt) {
    features.push({
      icon: <Calendar className="h-5 w-5" />,
      label: "Año construcción",
      value: String(property.yearBuilt),
    });
  }

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
      <h3 className="font-serif text-xl font-semibold text-ink">Características</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent-dark">
              {feature.icon}
            </span>
            <div>
              <p className="text-[12px] font-medium text-muted">{feature.label}</p>
              <p className="text-[15px] font-semibold text-ink">{feature.value}</p>
            </div>
          </div>
        ))}
      </div>
      {property.furnished && (
        <p className="mt-4 flex items-center gap-2 text-[13px] font-medium text-accent-dark">
          <Building2 className="h-4 w-4" />
          Amueblado
        </p>
      )}
    </div>
  );
}
