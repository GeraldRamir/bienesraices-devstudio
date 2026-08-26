"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";
import { SectionLink } from "./SectionLink";

export function FAQSection() {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const preview = faqs.slice(0, 6);

  return (
    <section className="border-t border-black/[0.04] bg-white py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Preguntas frecuentes"
            description="Respuestas claras sobre compra, venta, alquiler e inversión inmobiliaria en RD."
          />
        </Reveal>

        <StaggerGroup className="mx-auto mt-12 max-w-3xl space-y-3" stagger={0.06}>
          {preview.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <StaggerItem key={faq.id}>
                <div className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-cream/50 transition-colors hover:border-black/[0.1]">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/80 sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold text-ink">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "mt-0.5 size-5 shrink-0 text-muted transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted sm:px-6">{faq.answer}</p>
                  </motion.div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal className="mt-12 text-center" delay={0.08}>
          <SectionLink href="/faq">Ver todas las preguntas</SectionLink>
        </Reveal>
      </div>
    </section>
  );
}
