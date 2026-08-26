import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, getBlogBySlug } from "@/data";
import { SiteShell, PageHero } from "@/components/layout/SiteShell";
import { createPageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <SiteShell whatsapp={false}>
      <PageHero eyebrow={post.category} title={post.title} description={`${formatDate(post.publishedAt)} · ${post.readTime} min lectura`} />
      <article className="container-site max-w-3xl py-10 lg:py-14">
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="800px" priority />
        </div>
        <div className="prose prose-neutral max-w-none text-[16px] leading-relaxed text-[#444]">
          {post.content.split("\n\n").map((p) => (
            <p key={p.slice(0, 20)} className="mb-4">{p}</p>
          ))}
        </div>
        <Link href="/blog" className="mt-8 inline-flex text-[14px] font-semibold text-ink underline-offset-4 hover:underline">
          ← Volver al blog
        </Link>
      </article>
    </SiteShell>
  );
}
