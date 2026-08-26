"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

const visiblePaths = ["/", "/propiedades", "/contacto"];

export function WhatsAppButton() {
  const pathname = usePathname();
  const show =
    visiblePaths.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p))) ||
    pathname.startsWith("/propiedad/");

  if (!show) return null;

  const message = encodeURIComponent(
    "Hola, estoy interesado/a en conocer más sobre sus propiedades."
  );
  const url = `https://wa.me/${SITE.whatsapp}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-demo-allow="true"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
