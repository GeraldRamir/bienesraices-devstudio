"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { useInView } from "@/hooks/useInView";

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

    const duration = 1500;
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
    <span className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none text-ink">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section ref={ref} className="border-y border-black/[0.04] bg-white py-16 lg:py-24">
      <div className="container-site">
        <StaggerGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} variant="scale-up">
              <Reveal className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                <p className="mt-3 text-[14px] font-medium text-muted">{stat.label}</p>
              </Reveal>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
