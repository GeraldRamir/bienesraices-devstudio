import { SectionHeader } from "@/components/ui/SectionHeader";
import { getLuxuryProperties } from "@/data";
import { HomePropertyCard } from "./HomePropertyCard";
import { HomeSection } from "./HomeSection";
import { SectionLink } from "./SectionLink";

export function LuxuryCollection() {
  const properties = getLuxuryProperties().slice(0, 3);

  return (
    <HomeSection variant="dark">
      <SectionHeader
        eyebrow="Colección de lujo"
        title="Residencias de alto standing"
        description="Propiedades exclusivas con acabados premium, amenidades de clase mundial y ubicaciones privilegiadas."
        dark
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <HomePropertyCard key={property.id} property={property} variant="luxury" priority={index === 0} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <SectionLink href="/propiedades?luxury=true" dark variant="primary">
          Ver colección completa
        </SectionLink>
      </div>
    </HomeSection>
  );
}
