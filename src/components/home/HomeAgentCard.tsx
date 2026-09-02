import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import type { Agent } from "@/types";

export function HomeAgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="pf-card pf-card--white pf-card--elevated overflow-hidden">
      <Link href={`/agentes/${agent.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#ebebea]">
          <Image
            src={agent.photo}
            alt={agent.name}
            fill
            className="object-cover object-top"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
        <div className="space-y-2 p-5">
          <h3 className="text-[17px] font-bold text-ink">{agent.name}</h3>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-dark">
            {agent.role}
          </p>
          <p className="text-[14px] leading-relaxed text-muted">{agent.specialty}</p>
          <div className="flex flex-wrap gap-4 border-t border-black/[0.06] pt-4 text-[13px] text-[#555]">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-accent-dark" />
              {agent.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="size-4 text-accent-dark" />
              {agent.activeProperties} activas
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
