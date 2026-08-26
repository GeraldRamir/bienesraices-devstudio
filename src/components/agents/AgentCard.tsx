import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import type { Agent } from "@/types";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <Link href={`/agentes/${agent.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={agent.photo}
            alt={agent.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <h3 className="font-serif text-xl font-semibold text-ink">{agent.name}</h3>
          <p className="mt-1 text-[13px] font-medium text-accent-dark">{agent.role}</p>
          <p className="mt-2 text-[14px] text-muted">{agent.specialty}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-[13px] text-[#555]">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{agent.location}</span>
            <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{agent.activeProperties} activas</span>
          </div>
          <span className="mt-4 inline-flex text-[13px] font-semibold text-ink underline-offset-4 group-hover:underline">
            Ver perfil →
          </span>
        </div>
      </Link>
    </article>
  );
}
