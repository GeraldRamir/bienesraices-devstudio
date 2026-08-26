import Link from "next/link";
import {
  ArrowUpRight,
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
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import { SectionLink } from "./SectionLink";

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

export function ServicesPreview() {
  const preview = services.slice(0, 4);

  return (
    <section className="border-y border-black/[0.04] bg-cream-dark/30 py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Servicios"
            title="Todo lo que necesitas en un solo lugar"
            description="Desde la búsqueda hasta la entrega de llaves, ofrecemos soluciones integrales para compradores, vendedores e inversionistas."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.08}>
          {preview.map((service) => {
            const Icon = iconMap[service.icon] ?? Home;
            return (
              <StaggerItem key={service.id}>
                <Link
                  href={service.href}
                  className="hz-hover-feature group flex h-full flex-col rounded-[28px] border border-black/[0.06] bg-white p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-cream-dark text-accent-dark transition-colors group-hover:bg-badge-bg">
                      <Icon className="size-5" />
                    </div>
                    <span className="grid size-10 place-items-center rounded-full border border-black/10 opacity-0 transition-all group-hover:opacity-100">
                      <ArrowUpRight className="size-[18px] text-ink" strokeWidth={2.2} />
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{service.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{service.description}</p>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal className="mt-12 text-center" delay={0.08}>
          <SectionLink href="/servicios">Ver todos los servicios</SectionLink>
        </Reveal>
      </div>
    </section>
  );
}
