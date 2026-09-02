import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedProperties } from "@/data";
import { HomePropertyCard } from "./HomePropertyCard";
import { HomeSection } from "./HomeSection";
import { SectionLink } from "./SectionLink";

export function FeaturedProperties() {
  const properties = getFeaturedProperties().slice(0, 6);

  return (
    <HomeSection variant="white">
      <SectionHeader
        eyebrow="Propiedades destacadas"
        title="Selección exclusiva en venta y alquiler"
        description="Oportunidades verificadas por nuestro equipo, con ubicaciones premium y documentación en orden."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((property, index) => (
          <HomePropertyCard key={property.id} property={property} priority={index < 3} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <SectionLink href="/propiedades" variant="primary">
          Ver catálogo completo
        </SectionLink>
      </div>
    </HomeSection>
  );
}
