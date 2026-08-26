import { agents } from "@/data";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeAgentCard } from "./HomeAgentCard";
import { SectionLink } from "./SectionLink";

export function FeaturedAgents() {
  const featured = agents.slice(0, 3);

  return (
    <section className="py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Equipo"
            title="Conoce nuestros agentes"
            description="Asesores certificados con profundo conocimiento del mercado local."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {featured.map((agent) => (
            <StaggerItem key={agent.id} variant="scale-up">
              <HomeAgentCard agent={agent} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 text-center" delay={0.08}>
          <SectionLink href="/agentes">Ver todos los agentes</SectionLink>
        </Reveal>
      </div>
    </section>
  );
}
