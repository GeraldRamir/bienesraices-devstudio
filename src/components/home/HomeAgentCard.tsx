import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { Agent } from "@/types";

export function HomeAgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="hz-hover-card group overflow-hidden rounded-[28px] border border-black/[0.06] bg-white">
      <Link href={`/agentes/${agent.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
          <Image
            src={agent.photo}
            alt={agent.name}
            fill
            className="hz-hover-card__media object-cover object-center"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="hz-hover-card__overlay pointer-events-none absolute inset-0 bg-black/[0.06]" />
          <span
            className="hz-hover-card__arrow-btn absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-black/10 bg-white text-ink"
            aria-hidden
          >
            <ArrowUpRight className="hz-hover-card__arrow size-[18px]" strokeWidth={2.2} />
          </span>
        </div>
        <div className="hz-hover-product__info p-6">
          <h3 className="font-serif text-xl font-semibold text-ink">{agent.name}</h3>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-dark">{agent.role}</p>
          <p className="mt-2 text-[14px] text-muted">{agent.specialty}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-[13px] text-[#555]">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              {agent.location}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="size-3.5" />
              {agent.activeProperties} activas
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
