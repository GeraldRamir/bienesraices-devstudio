import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type EditorialImageCardProps = {
  href: string;
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function EditorialImageCard({
  href,
  image,
  alt,
  title,
  subtitle,
  badge,
  className,
  aspectClassName = "aspect-[4/3]",
  priority,
  sizes = "(max-width:768px) 100vw, 33vw",
}: EditorialImageCardProps) {
  return (
    <article className={cn("pf-card overflow-hidden", className)}>
      <Link href={href} className="block">
        <div className={cn("relative overflow-hidden bg-[#ebebea]", aspectClassName)}>
          <Image
            src={image}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          {badge ? (
            <span className="pf-tag absolute left-4 top-4 bg-white text-ink shadow-sm">{badge}</span>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            {subtitle ? (
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/75">
                {subtitle}
              </p>
            ) : null}
            <h3 className="mt-1 text-xl font-bold leading-tight text-white">{title}</h3>
          </div>
        </div>
      </Link>
    </article>
  );
}
