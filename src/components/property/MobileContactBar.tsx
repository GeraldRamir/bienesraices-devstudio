"use client";

import Link from "next/link";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import type { Agent, Property } from "@/types";
import { cn } from "@/lib/utils";

interface MobileContactBarProps {
  agent: Agent;
  property: Property;
  className?: string;
}

export function MobileContactBar({ agent, property, className }: MobileContactBarProps) {
  const phoneUrl = `tel:${agent.phone.replace(/\s/g, "")}`;
  const whatsappMessage = encodeURIComponent(
    `Hola ${agent.name}, me interesa la propiedad "${property.title}". ¿Podrían brindarme más información?`
  );
  const whatsappUrl = `https://wa.me/${agent.whatsapp}?text=${whatsappMessage}`;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.08] bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden",
        className
      )}
    >
      <div className="mx-auto flex max-w-lg items-stretch gap-2">
        <a
          href={phoneUrl}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-cream py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-cream-dark"
        >
          <Phone className="h-4 w-4" />
          Llamar
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-[#25D366] py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          href={`/contacto?propiedad=${property.slug}&agente=${agent.slug}`}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-ink py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Calendar className="h-4 w-4" />
          Agendar visita
        </Link>
      </div>
    </div>
  );
}
