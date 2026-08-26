import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";

export default function NotFound() {
  return (
    <SiteShell whatsapp={false}>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-24 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-dark">404</p>
        <h1 className="mt-4 max-w-lg font-serif text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
          Esta propiedad ya no está aquí... o quizás nunca estuvo.
        </h1>
        <p className="mt-4 max-w-md text-[15px] text-muted">
          La página que buscas no existe o fue movida. Explora nuestro catálogo de propiedades.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white">
            Volver al inicio
          </Link>
          <Link href="/propiedades" className="rounded-full border border-black/10 px-6 py-3 text-[14px] font-semibold text-ink">
            Explorar propiedades
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
