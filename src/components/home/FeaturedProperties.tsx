import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedProperties } from "@/data";
import { HomePropertyCard } from "./HomePropertyCard";
import { SectionLink } from "./SectionLink";

export function FeaturedProperties() {
  const properties = getFeaturedProperties().slice(0, 6);

  return (
    <section className="py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Destacadas"
            title="Propiedades seleccionadas para ti"
            description="Una curaduría de las mejores oportunidades en venta y alquiler, verificadas por nuestro equipo."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3" stagger={0.08}>
          {properties.map((property, index) => (
            <StaggerItem key={property.id}>
              <HomePropertyCard property={property} priority={index < 3} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 text-center" delay={0.1}>
          <SectionLink href="/propiedades">Ver todas las propiedades</SectionLink>
        </Reveal>
      </div>
    </section>
  );
}
