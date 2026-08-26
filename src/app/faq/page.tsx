"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  return (
    <SiteShell whatsapp={false}>
      <PageHero
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        description="Respuestas a las dudas más comunes sobre compra, alquiler e inversión."
      />
      <section className="container-site max-w-3xl py-10 lg:py-14">
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-ink">{question}</span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      <div className={cn("grid transition-all", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-[14px] leading-relaxed text-muted">{answer}</p>
        </div>
      </div>
    </div>
  );
}
