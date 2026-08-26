import { agents } from "@/data";
import { AgentCard } from "@/components/agents/AgentCard";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nuestros agentes inmobiliarios",
  description: "Conoce al equipo de asesores especializados de Horizon Bienes Raíces.",
  path: "/agentes",
});

export default function AgentesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Equipo"
        title="Conoce nuestros agentes"
        description="Profesionales locales con experiencia en compra, venta e inversión inmobiliaria."
      />
      <section className="container-site py-10 lg:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
