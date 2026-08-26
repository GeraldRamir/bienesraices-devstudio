import { PropertiesListingWrapper } from "@/components/property/PropertiesListingWrapper";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Propiedades en alquiler",
  description: "Alquila apartamentos, casas y villas en las mejores ubicaciones.",
  path: "/propiedades/alquiler",
});

export default function AlquilerPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Alquilar"
        title="Propiedades en alquiler"
        description="Encuentra el espacio perfecto para vivir o vacacionar con total comodidad."
      />
      <section className="container-site py-10 lg:py-14">
        <PropertiesListingWrapper initialFilters={{ purpose: "rent" }} />
      </section>
    </SiteShell>
  );
}
