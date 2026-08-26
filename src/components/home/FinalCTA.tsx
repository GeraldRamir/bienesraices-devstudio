import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function FinalCTA() {
  return (
    <section className="pb-16 pt-4 lg:pb-28">
      <div className="container-site">
        <Reveal variant="scale-up" y={32}>
          <div className="hz-dark-panel relative overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(156,175,122,0.18),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(156,175,122,0.1),transparent_50%)]" />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                Da el siguiente paso
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.85rem)] font-semibold leading-tight text-white">
                Tu próximo hogar te está esperando
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/65">
                Explora propiedades exclusivas o agenda una consulta gratuita con uno de nuestros
                agentes especializados. Estamos listos para ayudarte.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/propiedades"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,255,255,0.15)]"
                >
                  Explorar propiedades
                  <ArrowUpRight className="size-4" strokeWidth={2.2} />
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[14px] font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                >
                  Contactar un agente
                  <ArrowUpRight className="size-4" strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
