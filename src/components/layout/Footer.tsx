import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Newsletter } from "@/components/ui/Newsletter";
import { SITE } from "@/lib/constants";

const footerLinks = {
  propiedades: [
    { label: "Comprar", href: "/propiedades/venta" },
    { label: "Alquilar", href: "/propiedades/alquiler" },
    { label: "Casas", href: "/propiedades?type=house" },
    { label: "Apartamentos", href: "/propiedades?type=apartment" },
    { label: "Villas", href: "/propiedades?type=villa" },
    { label: "Terrenos", href: "/propiedades?type=land" },
    { label: "Propiedades comerciales", href: "/propiedades?type=commercial" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Agentes", href: "/agentes" },
    { label: "Servicios", href: "/servicios" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
  ],
  ayuda: [
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Política de cookies", href: "/cookies" },
    { label: "Soporte", href: "/contacto" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
              {SITE.description}
            </p>
            <div className="mt-5 flex gap-3">
              <SocialLink href={SITE.social.instagram} label="Instagram">IG</SocialLink>
              <SocialLink href={SITE.social.facebook} label="Facebook">FB</SocialLink>
              <SocialLink href={SITE.social.linkedin} label="LinkedIn">IN</SocialLink>
              <SocialLink href={SITE.social.youtube} label="YouTube">YT</SocialLink>
            </div>
          </div>

          <FooterColumn title="Propiedades" links={footerLinks.propiedades} />
          <FooterColumn title="Empresa" links={footerLinks.empresa} />
          <FooterColumn title="Ayuda" links={footerLinks.ayuda} />

          <div>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-ink">Contacto</h3>
            <ul className="space-y-2.5 text-[14px] text-muted">
              <li>{SITE.address}</li>
              <li><a href={`tel:${SITE.phone}`} className="hover:text-ink">{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-ink">{SITE.email}</a></li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-black/[0.06] pt-10">
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-black/[0.06] bg-cream-dark/40">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-[13px] text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-ink">Privacidad</Link>
            <Link href="/terminos" className="hover:text-ink">Términos</Link>
            <Link href="/cookies" className="hover:text-ink">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-ink">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[14px] text-muted transition-colors hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] text-[11px] font-bold text-ink transition-colors hover:bg-cream-dark"
    >
      {children}
    </a>
  );
}
