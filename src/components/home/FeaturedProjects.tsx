import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionLink } from "./SectionLink";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="border-y border-black/[0.04] bg-cream-dark/50 py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Desarrollos"
            title="Proyectos en preventa y entrega"
            description="Accede a los desarrollos más exclusivos del país con precios preferenciales y acompañamiento integral."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.09}>
          {featured.map((project) => (
            <StaggerItem key={project.id} variant="scale-up">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 text-center" delay={0.08}>
          <SectionLink href="/proyectos">Ver todos los proyectos</SectionLink>
        </Reveal>
      </div>
    </section>
  );
}
