import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/types";
import { formatPrice, projectStatusLabel } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="hz-hover-card group overflow-hidden rounded-[28px] border border-black/[0.06] bg-white">
      <Link href={`/proyectos/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-cream-dark">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="hz-hover-card__media object-cover object-center"
          />
          <div className="hz-hover-card__overlay pointer-events-none absolute inset-0 bg-black/[0.06]" />
          <span className="hz-pill absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-ink">
            {projectStatusLabel(project.status)}
          </span>
          <span
            className="hz-hover-card__arrow-btn absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-black/10 bg-white text-ink"
            aria-hidden
          >
            <ArrowUpRight className="hz-hover-card__arrow size-[18px]" strokeWidth={2.2} />
          </span>
        </div>
        <div className="hz-hover-product__info p-6">
          <p className="flex items-center gap-1 text-[13px] text-muted">
            <MapPin className="size-3.5 shrink-0" />
            {project.location.sector}, {project.location.city}
          </p>
          <h3 className="mt-2 font-serif text-xl font-semibold text-ink">{project.name}</h3>
          <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted">{project.description}</p>
          <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
            <p className="text-[13px] text-muted">
              Desde{" "}
              <span className="font-semibold text-ink">
                {formatPrice(project.priceFrom, project.currency)}
              </span>
            </p>
            <span className="text-[13px] font-semibold text-accent-dark">{project.units} unidades</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
