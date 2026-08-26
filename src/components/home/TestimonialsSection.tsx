"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const prev = () => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="border-y border-black/[0.04] bg-cream-dark/50 py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Testimonios"
            title="Lo que dicen nuestros clientes"
            description="Historias reales de familias, inversionistas y empresas que confiaron en Horizon Bienes Raíces."
          />
        </Reveal>

        <StaggerGroup className="mt-12 hidden gap-5 lg:grid lg:grid-cols-3" stagger={0.1}>
          {testimonials.slice(0, 3).map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 lg:hidden">
          <TestimonialCard testimonial={current} featured />
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Testimonio anterior"
              className="flex size-11 items-center justify-center rounded-full border border-black/[0.08] bg-white text-ink transition-colors hover:bg-cream-dark"
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
              className="flex size-11 items-center justify-center rounded-full border border-black/[0.08] bg-white text-ink transition-colors hover:bg-cream-dark"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  featured,
}: {
  testimonial: (typeof testimonials)[number];
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "hz-hover-review flex h-full flex-col rounded-[28px] border border-black/[0.06] bg-white p-7",
        featured && "shadow-[0_4px_24px_rgba(0,0,0,0.04)]",
      )}
    >
      <Quote className="size-8 text-accent/60" />
      <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[#444]">
        &ldquo;{testimonial.comment}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-black/[0.06] pt-5">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
          <Image src={testimonial.photo} alt={testimonial.name} fill className="object-cover" sizes="44px" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-ink">{testimonial.name}</p>
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
