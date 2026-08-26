import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Blog inmobiliario",
  description: "Consejos, tendencias y guías sobre bienes raíces en República Dominicana.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <SiteShell whatsapp={false}>
      <PageHero
        eyebrow="Insights"
        title="Consejos y tendencias inmobiliarias"
        description="Artículos para ayudarte a tomar mejores decisiones de compra, venta e inversión."
      />
      <section className="container-site py-10 lg:py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="33vw" />
                </div>
                <div className="p-5">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-accent-dark">{post.category}</p>
                  <h2 className="mt-2 font-serif text-xl font-semibold text-ink line-clamp-2">{post.title}</h2>
                  <p className="mt-2 text-[13px] text-muted">{formatDate(post.publishedAt)} · {post.readTime} min lectura</p>
                  <span className="mt-3 inline-flex text-[13px] font-semibold text-ink">Leer artículo →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
