import Link from "next/link";
import {
  Briefcase,
  Building2,
  Calculator,
  Home,
  Key,
  Scale,
  Settings,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  key: Key,
  "trending-up": TrendingUp,
  "building-2": Building2,
  calculator: Calculator,
  briefcase: Briefcase,
  settings: Settings,
  scale: Scale,
};

export const metadata = createPageMetadata({
  title: "Servicios inmobiliarios",
  description: "Compra, venta, alquiler, tasación, inversión y administración de propiedades.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Servicios"
        title="Servicios inmobiliarios integrales"
        description="Soluciones completas para compradores, vendedores, inversionistas y propietarios."
      />
      <section className="container-site py-10 lg:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Building2;
            return (
              <article key={service.id} className="rounded-2xl border border-black/[0.06] bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-dark">
                  <Icon className="h-5 w-5 text-ink" />
                </div>
                <h2 className="mt-4 font-serif text-xl font-semibold text-ink">{service.title}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{service.description}</p>
                <Link href={service.href.startsWith("/") ? service.href : "/contacto"} className="mt-4 inline-flex text-[13px] font-semibold text-ink underline-offset-4 hover:underline">
                  Conocer más →
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
