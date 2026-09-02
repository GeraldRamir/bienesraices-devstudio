import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";
import { HomeSection } from "./HomeSection";

export function SellerCTA() {
  return (
    <HomeSection variant="soft">
      <div className="relative overflow-hidden rounded-[32px] bg-[#eef2e6] px-6 py-12 sm:px-10 sm:py-14">
        <span className="pf-blob -right-10 -top-10 size-40" aria-hidden />
        <span className="pf-blob -bottom-16 -left-16 size-52 opacity-50" aria-hidden />

        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="pf-icon-wrap mb-5 bg-white">
              <Home className="size-5" />
            </div>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.03em] text-ink">
              ¿Quieres vender tu propiedad?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#4a5240]">
              Obtén una valoración profesional gratuita y conecta con compradores calificados.
              Nuestros agentes te guían en cada paso del proceso.
            </p>
          </div>

          <Link href="/valoracion" className="pf-btn pf-btn--primary shrink-0">
            Solicitar valoración
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </HomeSection>
  );
}
