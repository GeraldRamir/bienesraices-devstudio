import { Skeleton, SkeletonPill, SkeletonText } from "@/components/ui/Skeleton";

function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-2 p-4">
        <SkeletonText className="w-20" />
        <SkeletonText className="h-5 w-3/4" />
        <SkeletonText className="w-1/2" />
      </div>
    </div>
  );
}

function EditorialCardSkeleton({ tall }: { tall?: boolean }) {
  return (
    <Skeleton className={tall ? "aspect-[21/9] w-full rounded-xl" : "aspect-[4/3] w-full rounded-xl"} />
  );
}

export function HomeSectionsSkeleton() {
  return (
    <div className="home-below-hero space-y-0" aria-busy="true" aria-label="Cargando secciones">
      <section className="border-y border-black/[0.05] bg-white py-14 lg:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <SkeletonPill className="mx-auto" />
            <SkeletonText className="mx-auto mt-5 h-9 w-4/5" />
            <SkeletonText className="mx-auto mt-3 h-4 w-full" />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <SkeletonPill className="mx-auto" />
            <SkeletonText className="mx-auto mt-5 h-9 w-3/4" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <EditorialCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2ef] py-14 lg:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <SkeletonPill className="mx-auto" />
            <SkeletonText className="mx-auto mt-5 h-9 w-2/3" />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <EditorialCardSkeleton tall />
            <EditorialCardSkeleton />
            <EditorialCardSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
}
