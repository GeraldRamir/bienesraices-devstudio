"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useFavorites } from "@/context/FavoritesContext";
import { useScrollNavbar } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const propertyLinks = [
  { label: "Todas las propiedades", href: "/propiedades" },
  { label: "Casas", href: "/propiedades?type=house" },
  { label: "Apartamentos", href: "/propiedades?type=apartment" },
  { label: "Villas", href: "/propiedades?type=villa" },
  { label: "Terrenos", href: "/propiedades?type=land" },
  { label: "Locales comerciales", href: "/propiedades?type=commercial" },
  { label: "Propiedades de lujo", href: "/propiedades?luxury=true" },
];

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Comprar", href: "/propiedades/venta" },
  { label: "Alquilar", href: "/propiedades/alquiler" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Agentes", href: "/agentes" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrollNavbar();
  const { favorites } = useFavorites();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-4 transition-all duration-300 sm:px-6 lg:px-8",
          scrolled ? "pt-3" : "pt-5"
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-[54px] max-w-[1280px] items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-5",
            scrolled
              ? "border-black/[0.08] bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md"
              : "border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          )}
        >
          <Logo />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex" aria-label="Principal">
            {navLinks.slice(0, 1).map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors",
                  pathname.startsWith("/propiedades")
                    ? "bg-cream-dark text-ink"
                    : "text-[#1a1a1a] hover:bg-cream-dark/60"
                )}
                aria-expanded={dropdownOpen}
              >
                Propiedades
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-2xl border border-black/[0.06] bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  {propertyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-xl px-3 py-2 text-[13px] font-medium text-[#333] transition-colors hover:bg-cream-dark"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/propiedades"
              className="hidden rounded-full p-2 text-ink transition-colors hover:bg-cream-dark md:inline-flex"
              aria-label="Buscar propiedades"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/favoritos"
              className="relative rounded-full p-2 text-ink transition-colors hover:bg-cream-dark"
              aria-label="Favoritos"
            >
              <Heart className="h-4 w-4" />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              href="/publicar"
              className="hidden rounded-full border border-black/15 px-3.5 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:bg-cream-dark lg:inline-flex"
            >
              Vende tu propiedad
            </Link>
            <Link
              href="/contacto"
              className="hidden rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Contactar agente
            </Link>
            <button
              className="rounded-full p-2 text-ink transition-colors hover:bg-cream-dark lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors",
        active ? "bg-cream-dark text-ink" : "text-[#1a1a1a] hover:bg-cream-dark/60"
      )}
    >
      {children}
    </Link>
  );
}
