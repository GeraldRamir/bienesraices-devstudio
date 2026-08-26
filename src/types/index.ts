export type PropertyPurpose = "sale" | "rent";
export type PropertyType =
  | "house"
  | "apartment"
  | "villa"
  | "penthouse"
  | "land"
  | "commercial"
  | "office"
  | "luxury";

export type ProjectStatus = "upcoming" | "construction" | "ready";

export interface Location {
  city: string;
  sector: string;
  province: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  price: number;
  currency: "USD" | "DOP";
  location: Location;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  constructionArea: number;
  landArea?: number;
  floors?: number;
  yearBuilt?: number;
  furnished: boolean;
  featured: boolean;
  luxury: boolean;
  amenities: string[];
  images: string[];
  agentId: string;
  projectId?: string;
  publishedAt: string;
  views: number;
  petFriendly?: boolean;
  pool?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  security?: boolean;
  elevator?: boolean;
  seaView?: boolean;
  gatedCommunity?: boolean;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  role: string;
  specialty: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  photo: string;
  bio: string;
  experience: number;
  languages: string[];
  certifications: string[];
  activeProperties: number;
  social: { instagram?: string; linkedin?: string; facebook?: string };
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: Location;
  status: ProjectStatus;
  priceFrom: number;
  currency: "USD" | "DOP";
  deliveryDate: string;
  units: number;
  developer: string;
  image: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  readTime: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  photo: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface LocationCard {
  city: string;
  slug: string;
  count: number;
  image: string;
}

export interface CategoryCard {
  type: PropertyType;
  label: string;
  count: number;
  image: string;
}

export type SortOption =
  | "recent"
  | "price-asc"
  | "price-desc"
  | "area-desc"
  | "popular";

export interface PropertyFilters {
  purpose?: PropertyPurpose;
  city?: string;
  sector?: string;
  province?: string;
  type?: PropertyType;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  areaMin?: number;
  areaMax?: number;
  furnished?: boolean;
  pool?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  security?: boolean;
  elevator?: boolean;
  seaView?: boolean;
  petFriendly?: boolean;
  gatedCommunity?: boolean;
  luxury?: boolean;
  sort?: SortOption;
  q?: string;
}
