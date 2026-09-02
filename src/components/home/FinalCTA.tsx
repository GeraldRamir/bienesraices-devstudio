import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeSection } from "./HomeSection";

export function FinalCTA() {
  return (
    <HomeSection variant="white" className="pb-20 pt-4 lg:pb-28">
      <div className="pf-panel-dark relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-16">
        <span className="pf-blob right-8 top-8 size-32 bg-accent/30 opacity-40" aria-hidden />

        <div className="relative mx-auto max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
            Da el siguiente paso
          </p>
          <h2 className="mt-4 text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-white">
            Tu próximo hogar te está esperando
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-white/65">
            Explora propiedades exclusivas o agenda una consulta gratuita con uno de nuestros
            agentes especializados.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/propiedades" className="pf-btn bg-white text-ink hover:bg-white/90">
              Explorar propiedades
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </Link>
            <Link href="/contacto" className="pf-btn pf-btn--ghost-dark">
              Contactar un agente
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
