import type { MetadataRoute } from "next";
import { blogPosts, properties, agents } from "@/data";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticRoutes = [
    "", "/propiedades", "/propiedades/venta", "/propiedades/alquiler",
    "/proyectos", "/agentes", "/nosotros", "/servicios", "/contacto",
    "/favoritos", "/faq", "/blog", "/publicar", "/valoracion", "/comparar",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const propertyRoutes = properties.map((p) => ({
    url: `${base}/propiedad/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const agentRoutes = agents.map((a) => ({
    url: `${base}/agentes/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...agentRoutes, ...blogRoutes];
}
