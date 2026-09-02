import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { HomeSection } from "./HomeSection";
import { ProjectCard } from "./ProjectCard";
import { SectionLink } from "./SectionLink";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <HomeSection variant="soft">
      <SectionHeader
        eyebrow="Desarrollos"
        title="Proyectos en preventa y entrega"
        description="Accede a desarrollos exclusivos con precios preferenciales y acompañamiento integral durante todo el proceso."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <SectionLink href="/proyectos" variant="primary">
          Ver todos los proyectos
        </SectionLink>
      </div>
    </HomeSection>
  );
}
