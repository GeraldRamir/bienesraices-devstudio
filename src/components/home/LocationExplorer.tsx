import { SectionHeader } from "@/components/ui/SectionHeader";
import { locations } from "@/data/locations";
import { EditorialImageCard } from "./EditorialImageCard";
import { HomeSection } from "./HomeSection";

export function LocationExplorer() {
  return (
    <HomeSection variant="white">
      <SectionHeader
        eyebrow="Ubicaciones"
        title="Mercados con mayor demanda"
        description="Desde Santo Domingo hasta Punta Cana, accede a propiedades en las zonas más cotizadas del país."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location, index) => (
          <div
            key={location.slug}
            className={index === 0 ? "md:col-span-2 lg:col-span-2" : undefined}
          >
            <EditorialImageCard
              href={`/propiedades?city=${encodeURIComponent(location.city)}`}
              image={location.image}
              alt={`Propiedades en ${location.city}`}
              title={location.city}
              subtitle={`${location.count} propiedades · República Dominicana`}
              badge="Zona premium"
              aspectClassName={index === 0 ? "aspect-[21/9]" : "aspect-[16/10]"}
              sizes={index === 0 ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
            />
          </div>
        ))}
      </div>
    </HomeSection>
  );
}
