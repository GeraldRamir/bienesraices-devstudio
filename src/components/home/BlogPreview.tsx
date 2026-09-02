import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { HomeSection } from "./HomeSection";
import { SectionLink } from "./SectionLink";

export function BlogPreview() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <HomeSection variant="soft">
      <SectionHeader
        eyebrow="Blog inmobiliario"
        title="Guías y análisis de mercado"
        description="Consejos, tendencias y datos para tomar mejores decisiones inmobiliarias en República Dominicana."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {latest.map((post) => (
          <article key={post.id} className="pf-card pf-card--white pf-card--elevated overflow-hidden">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#ebebea]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover object-center"
                />
                <span className="pf-tag absolute left-4 top-4 bg-white text-ink shadow-sm">
                  {post.category}
                </span>
              </div>
              <div className="space-y-2 p-5">
                <div className="flex items-center gap-3 text-[13px] text-muted">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {post.readTime} min
                  </span>
                </div>
                <h3 className="text-[16px] font-bold leading-snug text-ink">{post.title}</h3>
                <p className="line-clamp-2 text-[14px] leading-relaxed text-muted">{post.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <SectionLink href="/blog">Ver todos los artículos</SectionLink>
      </div>
    </HomeSection>
  );
}
