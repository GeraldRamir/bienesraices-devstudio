import Image from "next/image";
import Link from "next/link";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { StatsSection } from "@/components/home/StatsSection";
import { createPageMetadata } from "@/lib/seo";
import { SITE, CITIES } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Sobre nosotros",
  description: "Conoce la historia, misión y valores de Horizon Bienes Raíces.",
  path: "/nosotros",
});

const values = [
  { title: "Integridad", desc: "Transparencia en cada etapa del proceso inmobiliario." },
  { title: "Excelencia", desc: "Estándares premium en servicio y selección de propiedades." },
  { title: "Cercanía", desc: "Acompañamiento personalizado de principio a fin." },
];

export default function NosotrosPage() {
  return (
    <SiteShell whatsapp={false}>
      <PageHero
        eyebrow="Empresa"
        title="Una mejor forma de encontrar tu próximo hogar"
        description="Somos una inmobiliaria premium con más de 15 años conectando personas con propiedades excepcionales en República Dominicana."
      />

      <section className="container-site py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ink">Nuestra historia</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#444]">
              {SITE.name} nació con la visión de elevar el estándar inmobiliario en el país. Combinamos
              tecnología, datos de mercado y asesoría humana para que cada cliente tome decisiones
              informadas con total confianza.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#444]">
              Hoy operamos en las principales zonas de demanda, desde Santo Domingo hasta Punta Cana,
              con un equipo de agentes certificados y una cartera verificada de propiedades.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Equipo Horizon Bienes Raíces"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="bg-white py-14">
        <div className="container-site grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Misión</h2>
            <p className="mt-3 text-[15px] text-muted">Facilitar experiencias inmobiliarias excepcionales con transparencia, datos y servicio personalizado.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Visión</h2>
            <p className="mt-3 text-[15px] text-muted">Ser la referencia premium de bienes raíces en el Caribe, reconocida por confianza e innovación.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Valores</h2>
            <ul className="mt-3 space-y-2">
              {values.map((v) => (
                <li key={v.title}><strong>{v.title}:</strong> <span className="text-muted">{v.desc}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-site py-14">
        <h2 className="font-serif text-2xl font-semibold text-ink">Zonas donde operamos</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {CITIES.map((city) => (
            <Link key={city} href={`/propiedades?city=${encodeURIComponent(city)}`} className="rounded-full border border-black/10 px-4 py-2 text-[14px] font-medium hover:bg-cream-dark">
              {city}
            </Link>
          ))}
        </div>
        <Link href="/contacto" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white">
          Hablar con un asesor
        </Link>
      </section>
    </SiteShell>
  );
}
