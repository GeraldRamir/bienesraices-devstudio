import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = title.includes(SITE.name) ? title : title;
  const url = `${SITE.url}${path}`;

  return {
    title: fullTitle,
    description: description ?? SITE.description,
    openGraph: {
      title: fullTitle,
      description: description ?? SITE.description,
      url,
      siteName: SITE.name,
      locale: "es_DO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description ?? SITE.description,
    },
    alternates: { canonical: url },
  };
}

export function propertyJsonLd(property: {
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  slug: string;
  location: { city: string; sector: string; country: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${SITE.url}/propiedad/${property.slug}`,
    image: property.images[0],
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location.city,
      addressRegion: property.location.sector,
      addressCountry: property.location.country,
    },
  };
}
