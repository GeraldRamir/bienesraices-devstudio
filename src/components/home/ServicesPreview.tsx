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
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import { HomeSection } from "./HomeSection";
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
    <HomeSection variant="white">
      <SectionHeader
        eyebrow="Servicios"
        title="Soluciones inmobiliarias integrales"
        description="Desde la búsqueda hasta la entrega de llaves, acompañamos compradores, vendedores e inversionistas."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {preview.map((service) => {
          const Icon = iconMap[service.icon] ?? Home;
          return (
            <Link
              key={service.id}
              href={service.href}
              className="pf-card group flex h-full flex-col p-6 transition-colors hover:bg-[#efefed]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="pf-icon-wrap">
                  <Icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-muted" />
              </div>
              <h3 className="mt-5 text-[16px] font-bold text-ink">{service.title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{service.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <SectionLink href="/servicios">Ver todos los servicios</SectionLink>
      </div>
    </HomeSection>
  );
}
