"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";

const propertyLinks = [
  { label: "Todas las propiedades", href: "/propiedades" },
  { label: "Casas", href: "/propiedades?type=house" },
  { label: "Apartamentos", href: "/propiedades?type=apartment" },
  { label: "Villas", href: "/propiedades?type=villa" },
  { label: "Propiedades de lujo", href: "/propiedades?luxury=true" },
];

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Comprar", href: "/propiedades/venta" },
  { label: "Alquilar", href: "/propiedades/alquiler" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Agentes", href: "/agentes" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
          <Logo />
          <button onClick={onClose} className="rounded-full p-2 hover:bg-cream-dark" aria-label="Cerrar">
            ✕
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Menú</p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block border-b border-black/[0.04] py-3.5 text-[15px] font-semibold text-ink"
            >
              {link.label}
            </Link>
          ))}
          <p className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted">Propiedades</p>
          {propertyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block py-2.5 text-[14px] font-medium text-[#444]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 border-t border-black/[0.06] p-5">
          <Link
            href="/publicar"
            onClick={onClose}
            className="block w-full rounded-full border border-black/15 py-3 text-center text-[14px] font-semibold"
          >
            Vende tu propiedad
          </Link>
          <Link
            href="/contacto"
            onClick={onClose}
            className="block w-full rounded-full bg-ink py-3 text-center text-[14px] font-semibold text-white"
          >
            Contactar agente
          </Link>
        </div>
      </div>
    </div>
  );
}
