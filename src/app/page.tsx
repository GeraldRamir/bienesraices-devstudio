import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <HomeSections />
    </SiteShell>
  );
}
