import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Política de privacidad",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <SiteShell whatsapp={false}>
      <PageHero title="Política de privacidad" />
      <section className="container-site max-w-3xl py-10 prose prose-neutral">
        <p>Horizon Bienes Raíces protege la información personal de sus usuarios conforme a la legislación vigente.</p>
      </section>
    </SiteShell>
  );
}
