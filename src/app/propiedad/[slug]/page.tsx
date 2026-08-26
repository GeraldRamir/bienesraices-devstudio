import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { agents, getPropertyBySlug, properties } from "@/data";
import { SiteShell } from "@/components/layout/SiteShell";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyFeatures } from "@/components/property/PropertyFeatures";
import { AmenitiesGrid } from "@/components/property/AmenitiesGrid";
import { PropertyMap } from "@/components/property/PropertyMap";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import { AgentContactCard } from "@/components/property/AgentContactCard";
import { MobileContactBar } from "@/components/property/MobileContactBar";
import { PropertyGrid } from "@/components/property/PropertyCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { createPageMetadata, propertyJsonLd } from "@/lib/seo";
import { formatDate, formatPrice, getSimilarProperties, purposeLabel } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return createPageMetadata({
    title: `${property.title} — ${purposeLabel(property.purpose)}`,
    description: property.description.slice(0, 160),
    path: `/propiedad/${property.slug}`,
  });
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = agents.find((a) => a.id === property.agentId);
  if (!agent) notFound();

  const similar = getSimilarProperties(property, properties);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd(property)) }}
      />
      <div className="pb-20 pt-[88px] lg:pb-0">
        <PropertyGallery images={property.images} title={property.title} />

        <div className="container-site py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
            <div>
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
                  <span className="rounded-full bg-cream-dark px-3 py-1 text-ink">{purposeLabel(property.purpose)}</span>
                  <span className="text-muted">ID: {property.id}</span>
                  <span className="text-muted">Publicado {formatDate(property.publishedAt)}</span>
                </div>
                <h1 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink">
                  {property.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-[15px] text-muted">
                  <MapPin className="h-4 w-4" />
                  {property.location.sector}, {property.location.city}, {property.location.country}
                </p>
                <p className="mt-4 text-3xl font-semibold text-ink">
                  {formatPrice(property.price, property.currency)}
                  {property.purpose === "rent" && <span className="text-base font-medium text-muted">/mes</span>}
                </p>
              </div>

              <PropertyFeatures property={property} />

              <div className="mt-10">
                <h2 className="font-serif text-2xl font-semibold text-ink">Descripción</h2>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-[#444]">
                  {property.description}
                </p>
              </div>

              <div className="mt-10">
                <h2 className="mb-4 font-serif text-2xl font-semibold text-ink">Amenidades</h2>
                <AmenitiesGrid amenities={property.amenities} />
              </div>

              {property.purpose === "sale" && (
                <div className="mt-10">
                  <MortgageCalculator price={property.price} currency={property.currency} />
                </div>
              )}

              <div className="mt-10">
                <h2 className="mb-4 font-serif text-2xl font-semibold text-ink">Ubicación</h2>
                <PropertyMap property={property} />
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <AgentContactCard agent={agent} property={property} />
              </div>
            </aside>
          </div>

          <div className="mt-16 lg:hidden">
            <AgentContactCard agent={agent} property={property} />
          </div>

          <section className="mt-20">
            <SectionHeader title="También podría interesarte" align="left" />
            <div className="mt-8">
              <PropertyGrid properties={similar} />
            </div>
            <Link href="/propiedades" className="mt-6 inline-flex text-[14px] font-semibold text-ink underline-offset-4 hover:underline">
              Ver todas las propiedades →
            </Link>
          </section>
        </div>
      </div>
      <MobileContactBar agent={agent} property={property} />
    </SiteShell>
  );
}
