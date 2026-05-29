import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { getPublishedBlogBySlug } from "@/lib/blog-queries";
import { formatBlogDate } from "@/lib/format-date";
import { sanitizeHtml } from "@/lib/sanitize";
import { BlogArticleClient } from "./client";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return blogs.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.short_description ?? post.description ?? undefined,
  };
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80";

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) notFound();

  const heroImage =
    post.banner_image || post.thumbnail_image || FALLBACK_IMAGE;
  const safeContent = sanitizeHtml(post.content);

  return (
    <>
      <BlogArticleClient title={post.title} />
      <article className="section-padding pb-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-electric"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="mt-8 block text-sm font-medium text-brand-electric">
            {post.category.name} · {formatBlogDate(post.published_at ?? post.created_at)}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold md:text-5xl leading-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-xl text-muted-foreground">{post.description}</p>
          )}
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={heroImage}
              alt={post.thumbnail_alt_text || post.title}
              fill
              className="object-cover"
              priority
            />
            {post.banner_text && (
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-lg font-semibold text-white">{post.banner_text}</p>
              </div>
            )}
          </div>
          {post.short_description && (
            <p className="mt-10 text-xl text-foreground leading-relaxed">
              {post.short_description}
            </p>
          )}
          <div
            className="prose prose-lg mt-10 max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
        </div>
      </article>
    </>
  );
}
