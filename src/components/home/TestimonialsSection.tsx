"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { HomeSection } from "./HomeSection";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const prev = () => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <HomeSection variant="white">
      <SectionHeader
        eyebrow="Testimonios"
        title="Lo que dicen nuestros clientes"
        description="Historias reales de familias, inversionistas y empresas que confiaron en Horizon Bienes Raíces."
      />

      <div className="mt-12 hidden gap-5 lg:grid lg:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <div className="mt-12 lg:hidden">
        <TestimonialCard testimonial={current} />
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Testimonio anterior"
            className="flex size-10 items-center justify-center rounded-full border border-black/[0.08] bg-[#f5f5f3] text-ink"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === active ? "w-6 bg-accent-dark" : "w-2 bg-black/15",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente testimonio"
            className="flex size-10 items-center justify-center rounded-full border border-black/[0.08] bg-[#f5f5f3] text-ink"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </HomeSection>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <article className="pf-card flex h-full flex-col p-6">
      <Quote className="size-7 text-accent/80" />
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#444]">
        &ldquo;{testimonial.comment}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-black/[0.06] pt-5">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
          <Image src={testimonial.photo} alt={testimonial.name} fill className="object-cover" sizes="44px" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-ink">{testimonial.name}</p>
          <p className="text-[13px] text-muted">{testimonial.role}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-black/10",
              )}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
