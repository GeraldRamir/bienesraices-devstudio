import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Project } from "@/types";
import { formatPrice, projectStatusLabel } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="pf-card pf-card--white pf-card--elevated overflow-hidden">
      <Link href={`/proyectos/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#ebebea]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <span className="pf-tag absolute left-4 top-4 bg-white text-ink shadow-sm">
            {projectStatusLabel(project.status)}
          </span>
        </div>
        <div className="space-y-2 p-5">
          <p className="flex items-center gap-1.5 text-[13px] text-muted">
            <MapPin className="size-4 shrink-0 text-accent-dark" />
            {project.location.sector}, {project.location.city}
          </p>
          <h3 className="text-[17px] font-bold text-ink">{project.name}</h3>
          <p className="line-clamp-2 text-[14px] leading-relaxed text-muted">{project.description}</p>
          <div className="flex items-center justify-between border-t border-black/[0.06] pt-4">
            <p className="text-[14px] text-muted">
              Desde{" "}
              <span className="font-bold text-ink">
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
