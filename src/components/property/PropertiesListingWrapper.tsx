import { Suspense } from "react";
import { PropertiesListing } from "@/components/property/PropertiesListing";
import type { PropertyFilters } from "@/types";

export function PropertiesListingWrapper({ initialFilters }: { initialFilters?: PropertyFilters }) {
  return (
    <Suspense fallback={<div className="py-12 text-center text-muted">Cargando propiedades...</div>}>
      <PropertiesListing initialFilters={initialFilters} />
    </Suspense>
  );
}
