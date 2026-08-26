import { Skeleton, SkeletonPill, SkeletonText } from "@/components/ui/Skeleton";

function PropertyCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[4/5] w-full sm:aspect-[3/4]" />
      <SkeletonText className="w-24" />
      <SkeletonText className="h-5 w-3/4" />
      <SkeletonText className="w-1/2" />
    </div>
  );
}

function EditorialCardSkeleton({ tall }: { tall?: boolean }) {
  return <Skeleton className={tall ? "aspect-[21/9] w-full" : "aspect-[4/3] w-full"} />;
}

export function HomeSectionsSkeleton() {
  return (
    <div className="space-y-0" aria-busy="true" aria-label="Cargando secciones">
      <section className="py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <SkeletonPill className="mx-auto" />
            <SkeletonText className="mx-auto mt-6 h-10 w-4/5" />
            <SkeletonText className="mx-auto mt-3 h-4 w-full" />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.04] bg-cream-dark/50 py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <SkeletonPill className="mx-auto" />
            <SkeletonText className="mx-auto mt-6 h-10 w-3/4" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <EditorialCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <SkeletonPill className="mx-auto" />
            <SkeletonText className="mx-auto mt-6 h-10 w-2/3" />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <EditorialCardSkeleton tall />
            <EditorialCardSkeleton />
            <EditorialCardSkeleton />
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <SkeletonPill className="mx-auto bg-white/10" />
            <Skeleton className="mx-auto mt-6 h-10 w-3/4 bg-white/10" />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full bg-white/10" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
