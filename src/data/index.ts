export { agents } from "./agents";
export { properties } from "./properties";
export { projects } from "./projects";
export { blogPosts } from "./blog";
export { testimonials } from "./testimonials";
export { faqs } from "./faq";
export { services } from "./services";
export { locations } from "./locations";
export { categories } from "./categories";

import { agents } from "./agents";
import { properties } from "./properties";
import { projects } from "./projects";
import { blogPosts } from "./blog";

export function getPropertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function getAgentBySlug(slug: string) {
  return agents.find((a) => a.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getBlogBySlug(slug: string) {
  return blogPosts.find((b) => b.slug === slug);
}

export function getPropertiesByAgent(agentId: string) {
  return properties.filter((p) => p.agentId === agentId);
}

export function getFeaturedProperties() {
  return properties.filter((p) => p.featured);
}

export function getLuxuryProperties() {
  return properties.filter((p) => p.luxury);
}
