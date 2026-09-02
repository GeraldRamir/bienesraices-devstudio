import {
  BlogPreview,
  CategoryExplorer,
  FAQSection,
  FeaturedProjects,
  FeaturedAgents,
  FeaturedProperties,
  FinalCTA,
  LocationExplorer,
  LuxuryCollection,
  SellerCTA,
  ServicesPreview,
  StatsSection,
  TestimonialsSection,
  WhatsAppLeadSection,
  WhyChooseUs,
} from "@/components/home";

export function HomeSections() {
  return (
    <div className="home-below-hero bg-white">
      <FeaturedProperties />
      <CategoryExplorer />
      <LocationExplorer />
      <StatsSection />
      <LuxuryCollection />
      <FeaturedProjects />
      <WhyChooseUs />
      <FeaturedAgents />
      <ServicesPreview />
      <WhatsAppLeadSection />
      <SellerCTA />
      <TestimonialsSection />
      <BlogPreview />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}
