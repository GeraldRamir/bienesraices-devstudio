"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { HomeSection } from "./HomeSection";

const stats = [
  { value: 500, suffix: "+", label: "Propiedades activas" },
  { value: 15, suffix: "+", label: "Años de experiencia" },
  { value: 98, suffix: "%", label: "Clientes satisfechos" },
  { value: 6, suffix: "", label: "Ciudades principales" },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span className="pf-stat-value">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <HomeSection variant="accent">
      <SectionHeader
        eyebrow="Nuestros números"
        title="Experiencia respaldada por resultados"
        description="Más de una década conectando personas con el inmueble correcto."
      />

      <div
        ref={ref}
        className="mt-12 grid gap-8 rounded-[32px] bg-white p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
            <p className="mt-3 text-[14px] font-medium text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </HomeSection>
  );
}
