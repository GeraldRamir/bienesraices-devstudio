"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";
import { HomeSection } from "./HomeSection";
import { SectionLink } from "./SectionLink";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const preview = faqs.slice(0, 6);

  return (
    <HomeSection variant="white">
      <SectionHeader
        eyebrow="Preguntas frecuentes"
        title="Resolvemos tus dudas"
        description="Información clara sobre compra, venta, alquiler e inversión inmobiliaria en RD."
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {preview.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="pf-card pf-card--white overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="text-[15px] font-semibold text-ink">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "mt-0.5 size-5 shrink-0 text-muted transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen ? (
                <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted sm:px-6">{faq.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <SectionLink href="/faq">Ver todas las preguntas</SectionLink>
      </div>
    </HomeSection>
  );
}
