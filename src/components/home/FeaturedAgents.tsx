import { agents } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeAgentCard } from "./HomeAgentCard";
import { HomeSection } from "./HomeSection";
import { SectionLink } from "./SectionLink";

export function FeaturedAgents() {
  const featured = agents.slice(0, 3);

  return (
    <HomeSection variant="soft">
      <SectionHeader
        eyebrow="Equipo de agentes"
        title="Asesores especializados"
        description="Profesionales certificados con profundo conocimiento del mercado local y atención personalizada."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((agent) => (
          <HomeAgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <SectionLink href="/agentes" variant="primary">
          Conocer todo el equipo
        </SectionLink>
      </div>
    </HomeSection>
  );
}
