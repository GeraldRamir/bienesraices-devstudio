import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getLuxuryProperties } from "@/data";
import { HomePropertyCard } from "./HomePropertyCard";
import { SectionLink } from "./SectionLink";

export function LuxuryCollection() {
  const properties = getLuxuryProperties().slice(0, 3);

  return (
    <section className="bg-ink py-16 lg:py-28">
      <div className="container-site">
        <Reveal variant="blur-up">
          <SectionHeader
            eyebrow="Colección exclusiva"
            title="Propiedades de lujo"
            description="Residencias excepcionales con acabados premium, ubicaciones privilegiadas y servicios de clase mundial."
            dark
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {properties.map((property, index) => (
            <StaggerItem key={property.id} variant="scale-up">
              <HomePropertyCard property={property} variant="luxury" priority={index === 0} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 text-center" delay={0.1}>
          <SectionLink href="/propiedades?luxury=true" dark>
            Ver colección de lujo
          </SectionLink>
        </Reveal>
      </div>
    </section>
  );
}
