import { PropertiesListingWrapper } from "@/components/property/PropertiesListingWrapper";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Propiedades en venta y alquiler",
  description:
    "Explora casas, apartamentos, villas y más en las mejores zonas de República Dominicana.",
  path: "/propiedades",
});

export default function PropiedadesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Catálogo"
        title="Encuentra tu próxima propiedad"
        description="Filtra por ubicación, tipo, precio y características para descubrir el hogar o inversión ideal."
      />
      <section className="container-site py-10 lg:py-14">
        <PropertiesListingWrapper />
      </section>
    </SiteShell>
  );
}
