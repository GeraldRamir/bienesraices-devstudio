import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Términos y condiciones",
  path: "/terminos",
});

export default function TerminosPage() {
  return (
    <SiteShell whatsapp={false}>
      <PageHero title="Términos y condiciones" />
      <section className="container-site max-w-3xl py-10">
        <p className="text-[15px] leading-relaxed text-muted">Al utilizar este sitio aceptas nuestros términos de uso y condiciones de servicio.</p>
      </section>
    </SiteShell>
  );
}
