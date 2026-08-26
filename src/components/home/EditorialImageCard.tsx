import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type EditorialImageCardProps = {
  href: string;
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  actionLabel?: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
  dark?: boolean;
};

export function EditorialImageCard({
  href,
  image,
  alt,
  title,
  subtitle,
  badge,
  actionLabel = "Explorar",
  className,
  aspectClassName = "aspect-[4/3]",
  priority,
  sizes = "(max-width:768px) 100vw, 33vw",
  dark = false,
}: EditorialImageCardProps) {
  return (
    <article className={cn("hz-hover-card group", className)}>
      <Link href={href} className="block overflow-hidden rounded-[28px]">
        <div className={cn("relative overflow-hidden bg-cream-dark", aspectClassName)}>
          <Image
            src={image}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="hz-hover-card__media object-cover object-center"
          />
          <div className="hz-hover-card__overlay pointer-events-none absolute inset-0 bg-black/10" />
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 via-black/30 to-transparent hz-hover-card__gradient",
              dark && "h-48 from-black/85",
            )}
          />
          {badge ? (
            <span className="hz-pill absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-ink">{badge}</span>
          ) : null}
          <div className="hz-hover-card__content absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
            <div className="text-white">
              {subtitle ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{subtitle}</p>
              ) : null}
              <h3 className="mt-1 font-serif text-xl font-semibold leading-tight sm:text-2xl">{title}</h3>
            </div>
            <span
              className={cn(
                "hz-hover-card__arrow-btn hidden shrink-0 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-sm sm:inline-flex",
                "group-hover:bg-white group-hover:text-ink",
              )}
            >
              {actionLabel}
            </span>
            <span
              className="hz-hover-card__arrow-btn grid size-10 place-items-center rounded-full bg-white text-ink sm:hidden"
              aria-hidden
            >
              <ArrowUpRight className="hz-hover-card__arrow size-[18px]" strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
