import { SectionHeader } from "@/components/ui/SectionHeader";
import { categories } from "@/data/categories";
import { EditorialImageCard } from "./EditorialImageCard";
import { HomeSection } from "./HomeSection";
import { SectionLink } from "./SectionLink";

export function CategoryExplorer() {
  return (
    <HomeSection variant="soft">
      <SectionHeader
        eyebrow="Tipos de propiedad"
        title="Encuentra el inmueble ideal"
        description="Apartamentos, casas, villas y terrenos en las mejores zonas de República Dominicana."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <EditorialImageCard
            key={category.type}
            href={`/propiedades?type=${category.type}`}
            image={category.image}
            alt={category.label}
            title={category.label}
            subtitle={`${category.count} disponibles`}
            badge={category.label}
            sizes="(max-width:768px) 50vw, 25vw"
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <SectionLink href="/propiedades">Explorar por categoría</SectionLink>
      </div>
    </HomeSection>
  );
}
