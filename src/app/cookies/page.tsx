import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Política de cookies",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <SiteShell whatsapp={false}>
      <PageHero title="Política de cookies" />
      <section className="container-site max-w-3xl py-10">
        <p className="text-[15px] leading-relaxed text-muted">Utilizamos cookies para mejorar tu experiencia de navegación y analizar el tráfico del sitio.</p>
      </section>
    </SiteShell>
  );
}
