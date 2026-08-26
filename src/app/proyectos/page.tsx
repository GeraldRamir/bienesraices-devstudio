import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import { projectStatusLabel } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Proyectos inmobiliarios",
  description: "Descubre nuevos desarrollos y proyectos en construcción en República Dominicana.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Desarrollos"
        title="Proyectos destacados"
        description="Nuevas residencias y desarrollos con entrega programada en las mejores zonas."
      />
      <section className="container-site py-10 lg:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
              <div className="relative aspect-[16/9]">
                <Image src={project.image} alt={project.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
              <div className="p-6">
                <span className="rounded-full bg-cream-dark px-3 py-1 text-[12px] font-semibold text-ink">
                  {projectStatusLabel(project.status)}
                </span>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-ink">{project.name}</h2>
                <p className="mt-1 text-[14px] text-muted">{project.location.sector}, {project.location.city}</p>
                <p className="mt-3 text-[14px] text-[#555]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-muted">
                  <span>Desde {formatPrice(project.priceFrom, project.currency)}</span>
                  <span>{project.units} unidades</span>
                  <span>Entrega: {project.deliveryDate}</span>
                  <span>{project.developer}</span>
                </div>
                <Link href="/contacto" className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white">
                  Solicitar información
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
