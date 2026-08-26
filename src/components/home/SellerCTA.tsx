import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function SellerCTA() {
  return (
    <section className="py-16 lg:py-28">
      <div className="container-site">
        <Reveal variant="scale-up">
          <div className="relative overflow-hidden rounded-[32px] bg-badge-bg px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
            <div className="absolute -right-8 -top-8 size-40 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 size-48 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-5 flex size-14 items-center justify-center rounded-[20px] bg-white text-accent-dark shadow-sm">
                  <Home className="size-6" />
                </div>
                <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-ink">
                  ¿Quieres vender tu propiedad?
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#4a5240]">
                  Obtén una valoración profesional gratuita y conecta con compradores calificados.
                  Nuestros agentes te guían en cada paso del proceso.
                </p>
              </div>

              <Link
                href="/valoracion"
                className="hz-btn-editorial hz-btn-editorial--dark shrink-0"
              >
                Solicitar valoración
                <ArrowUpRight className="hz-btn-editorial__arrow size-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
