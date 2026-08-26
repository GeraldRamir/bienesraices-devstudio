"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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
import { HomeSectionsSkeleton } from "./HomeSectionsSkeleton";

const LOAD_KEY = "hz-home-loaded";

export function HomeSections() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem(LOAD_KEY) === "1";
    if (alreadyLoaded) {
      setReady(true);
      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(LOAD_KEY, "1");
      setReady(true);
    }, 720);

    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return <HomeSectionsSkeleton />;
  }

  if (reduce) {
    return <HomeSectionsContent />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <HomeSectionsContent />
    </motion.div>
  );
}

function HomeSectionsContent() {
  return (
    <>
      <FeaturedProperties />
      <CategoryExplorer />
      <LocationExplorer />
      <LuxuryCollection />
      <FeaturedProjects />
      <WhyChooseUs />
      <StatsSection />
      <FeaturedAgents />
      <ServicesPreview />
      <WhatsAppLeadSection />
      <SellerCTA />
      <TestimonialsSection />
      <BlogPreview />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
