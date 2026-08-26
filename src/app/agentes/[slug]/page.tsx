import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { agents, getAgentBySlug, getPropertiesByAgent } from "@/data";
import { SiteShell, PageHero } from "@/components/layout/SiteShell";
import { PropertyGrid } from "@/components/property/PropertyCard";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) return {};
  return createPageMetadata({
    title: `${agent.name} — Agente inmobiliario`,
    description: agent.bio.slice(0, 160),
    path: `/agentes/${agent.slug}`,
  });
}

export default async function AgentProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const agentProperties = getPropertiesByAgent(agent.id);

  return (
    <SiteShell>
      <PageHero eyebrow="Agente" title={agent.name} description={agent.role} />
      <section className="container-site py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={agent.photo} alt={agent.name} fill className="object-cover" sizes="320px" />
            </div>
            <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
              <p className="text-[14px] text-muted">{agent.bio}</p>
              <ul className="mt-4 space-y-2 text-[14px]">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />{agent.location}</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{agent.phone}</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{agent.email}</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`https://wa.me/${agent.whatsapp}`} className="rounded-full bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white">WhatsApp</a>
                <Link href="/contacto" className="rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-white">Contactar</Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Especialidades</h2>
            <p className="mt-2 text-[15px] text-muted">{agent.specialty}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Stat label="Experiencia" value={`${agent.experience} años`} />
              <Stat label="Propiedades activas" value={String(agent.activeProperties)} />
              <Stat label="Idiomas" value={agent.languages.join(", ")} />
            </div>

            {agent.certifications.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold text-ink">Certificaciones</h3>
                <ul className="mt-2 list-inside list-disc text-[14px] text-muted">
                  {agent.certifications.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-12">
              <h2 className="font-serif text-2xl font-semibold text-ink">Propiedades de este agente</h2>
              <div className="mt-6">
                {agentProperties.length > 0 ? (
                  <PropertyGrid properties={agentProperties} />
                ) : (
                  <p className="text-muted">No hay propiedades activas en este momento.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream p-4">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-semibold text-ink">{value}</p>
    </div>
  );
}
