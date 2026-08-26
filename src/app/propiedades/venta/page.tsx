import { PropertiesListingWrapper } from "@/components/property/PropertiesListingWrapper";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Propiedades en venta",
  description: "Compra casas, apartamentos, villas y terrenos en República Dominicana.",
  path: "/propiedades/venta",
});

export default function VentaPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Comprar"
        title="Propiedades en venta"
        description="Descubre oportunidades de compra en las zonas más demandadas del país."
      />
      <section className="container-site py-10 lg:py-14">
        <PropertiesListingWrapper initialFilters={{ purpose: "sale" }} />
      </section>
    </SiteShell>
  );
}
