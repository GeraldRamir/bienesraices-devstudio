import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { locations } from "@/data/locations";
import { EditorialImageCard } from "./EditorialImageCard";

export function LocationExplorer() {
  return (
    <section className="py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Ubicaciones"
            title="Las mejores zonas del país"
            description="Desde la capital hasta la Costa Este, descubre propiedades en las ciudades con mayor demanda."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {locations.map((location, index) => (
            <StaggerItem
              key={location.slug}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : undefined}
              variant="blur-up"
            >
              <EditorialImageCard
                href={`/propiedades?city=${encodeURIComponent(location.city)}`}
                image={location.image}
                alt={`Propiedades en ${location.city}`}
                title={location.city}
                subtitle={`${location.count} ${location.count === 1 ? "propiedad disponible" : "propiedades disponibles"} · República Dominicana`}
                badge="Zona premium"
                actionLabel="Explorar"
                aspectClassName={index === 0 ? "aspect-[21/9]" : "aspect-[16/10]"}
                sizes={index === 0 ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
                dark
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
