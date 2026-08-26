import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categories } from "@/data/categories";
import { EditorialImageCard } from "./EditorialImageCard";
import { SectionLink } from "./SectionLink";

export function CategoryExplorer() {
  return (
    <section className="border-y border-black/[0.04] bg-cream-dark/50 py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Categorías"
            title="Explora por tipo de propiedad"
            description="Encuentra exactamente lo que buscas, desde apartamentos urbanos hasta villas frente al mar."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {categories.map((category) => (
            <StaggerItem key={category.type} variant="scale-up">
              <EditorialImageCard
                href={`/propiedades?type=${category.type}`}
                image={category.image}
                alt={category.label}
                title={category.label}
                subtitle={`${category.count} ${category.count === 1 ? "propiedad" : "propiedades"}`}
                badge={category.label}
                actionLabel="Ver más"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 text-center" delay={0.08}>
          <SectionLink href="/propiedades">Explorar catálogo completo</SectionLink>
        </Reveal>
      </div>
    </section>
  );
}
