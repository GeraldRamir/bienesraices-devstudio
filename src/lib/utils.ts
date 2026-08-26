import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Property, PropertyFilters, SortOption } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: "USD" | "DOP" = "USD") {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area: number) {
  return `${area.toLocaleString("es-DO")} m²`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-DO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function propertyTypeLabel(type: Property["type"]) {
  const labels: Record<Property["type"], string> = {
    house: "Casa",
    apartment: "Apartamento",
    villa: "Villa",
    penthouse: "Penthouse",
    land: "Terreno",
    commercial: "Local comercial",
    office: "Oficina",
    luxury: "Propiedad de lujo",
  };
  return labels[type];
}

export function purposeLabel(purpose: Property["purpose"]) {
  return purpose === "sale" ? "Venta" : "Alquiler";
}

import type { ProjectStatus } from "@/types";

export function projectStatusLabel(status: ProjectStatus) {
  const labels: Record<ProjectStatus, string> = {
    upcoming: "Próximamente",
    construction: "En construcción",
    ready: "Listo para entrega",
  };
  return labels[status];
}

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters
): Property[] {
  let result = [...properties];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.sector.toLowerCase().includes(q)
    );
  }
  if (filters.purpose) result = result.filter((p) => p.purpose === filters.purpose);
  if (filters.city) result = result.filter((p) => p.location.city === filters.city);
  if (filters.sector) result = result.filter((p) => p.location.sector === filters.sector);
  if (filters.province) result = result.filter((p) => p.location.province === filters.province);
  if (filters.type) result = result.filter((p) => p.type === filters.type);
  if (filters.priceMin) result = result.filter((p) => p.price >= filters.priceMin!);
  if (filters.priceMax) result = result.filter((p) => p.price <= filters.priceMax!);
  if (filters.bedrooms) result = result.filter((p) => p.bedrooms >= filters.bedrooms!);
  if (filters.bathrooms) result = result.filter((p) => p.bathrooms >= filters.bathrooms!);
  if (filters.parking) result = result.filter((p) => p.parking >= filters.parking!);
  if (filters.areaMin) result = result.filter((p) => p.constructionArea >= filters.areaMin!);
  if (filters.areaMax) result = result.filter((p) => p.constructionArea <= filters.areaMax!);
  if (filters.furnished) result = result.filter((p) => p.furnished);
  if (filters.pool) result = result.filter((p) => p.pool);
  if (filters.balcony) result = result.filter((p) => p.balcony);
  if (filters.terrace) result = result.filter((p) => p.terrace);
  if (filters.security) result = result.filter((p) => p.security);
  if (filters.elevator) result = result.filter((p) => p.elevator);
  if (filters.seaView) result = result.filter((p) => p.seaView);
  if (filters.petFriendly) result = result.filter((p) => p.petFriendly);
  if (filters.gatedCommunity) result = result.filter((p) => p.gatedCommunity);
  if (filters.luxury) result = result.filter((p) => p.luxury);

  return sortProperties(result, filters.sort ?? "recent");
}

export function sortProperties(properties: Property[], sort: SortOption) {
  const sorted = [...properties];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "area-desc":
      return sorted.sort((a, b) => b.constructionArea - a.constructionArea);
    case "popular":
      return sorted.sort((a, b) => b.views - a.views);
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }
}

export function getSimilarProperties(property: Property, all: Property[], limit = 4) {
  return all
    .filter((p) => p.id !== property.id)
    .map((p) => ({
      property: p,
      score:
        (p.location.city === property.location.city ? 3 : 0) +
        (p.type === property.type ? 2 : 0) +
        (Math.abs(p.price - property.price) < property.price * 0.3 ? 2 : 0) +
        (Math.abs(p.bedrooms - property.bedrooms) <= 1 ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.property);
}

export function calculateMortgage(
  price: number,
  downPayment: number,
  rate: number,
  years: number
) {
  const principal = price - downPayment;
  if (principal <= 0 || rate <= 0 || years <= 0) return 0;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}
