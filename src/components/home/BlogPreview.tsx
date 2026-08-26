import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { SectionLink } from "./SectionLink";

export function BlogPreview() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Blog"
            title="Guías e insights del mercado"
            description="Consejos, tendencias y análisis para tomar mejores decisiones inmobiliarias en República Dominicana."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.09}>
          {latest.map((post) => (
            <StaggerItem key={post.id} variant="scale-up">
              <article className="hz-hover-card group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-cream-dark">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="hz-hover-card__media object-cover object-center"
                    />
                    <div className="hz-hover-card__overlay pointer-events-none absolute inset-0 bg-black/[0.06]" />
                    <span className="hz-pill absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-ink">
                      {post.category}
                    </span>
                    <span
                      className="hz-hover-card__arrow-btn absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-black/10 bg-white text-ink"
                      aria-hidden
                    >
                      <ArrowUpRight className="hz-hover-card__arrow size-[18px]" strokeWidth={2.2} />
                    </span>
                  </div>
                  <div className="hz-hover-product__info mt-5">
                    <div className="flex items-center gap-3 text-[12px] text-muted">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime} min
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-accent-dark">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted">{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 text-center" delay={0.08}>
          <SectionLink href="/blog">Ver todos los artículos</SectionLink>
        </Reveal>
      </div>
    </section>
  );
}
