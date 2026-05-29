import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { BlogClient } from "./client";
import {
  getFeaturedPublishedBlog,
  getPublishedBlogs,
} from "@/lib/blog-queries";
import { formatBlogDate } from "@/lib/format-date";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Recruitment insights, hiring strategies, and industry perspectives from Nexellence.",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80";

export default async function BlogPage() {
  const [featured, posts] = await Promise.all([
    getFeaturedPublishedBlog(),
    getPublishedBlogs(),
  ]);

  const listPosts = featured
    ? posts.filter((p) => p.slug !== featured.slug)
    : posts;

  const clientPosts = listPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.short_description ?? "",
    category: p.category.name,
    date: formatBlogDate(p.published_at ?? p.created_at),
    image: p.thumbnail_image || FALLBACK_IMAGE,
    imageAlt: p.thumbnail_alt_text || p.title,
  }));

  return (
    <>
      <PageHero
        label="Blog"
        title="Insights from the talent frontier"
        description="Editorial perspectives on recruitment, hiring strategy, and workforce trends."
        dark
      />

      {featured ? (
        <section className="section-padding pb-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[21/9] min-h-[280px]">
                <Image
                  src={featured.banner_image || featured.thumbnail_image || FALLBACK_IMAGE}
                  alt={featured.thumbnail_alt_text || featured.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />
                <div className="absolute bottom-0 p-8 md:p-12 text-white">
                  <span className="rounded-full bg-brand-cyan/20 px-3 py-1 text-xs font-medium text-brand-cyan">
                    Featured · {featured.category.name}
                  </span>
                  {featured.banner_text && (
                    <p className="mt-2 text-sm text-white/70">{featured.banner_text}</p>
                  )}
                  <h2 className="mt-4 font-display text-2xl font-bold md:text-4xl max-w-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-white/70">
                    {featured.short_description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-cyan">
                    Read article{" "}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : (
        <section className="section-padding pb-8">
          <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#111] p-12 text-center text-white/60">
            No published posts yet. Check back soon.
          </div>
        </section>
      )}

      {clientPosts.length > 0 && <BlogClient posts={clientPosts} />}
    </>
  );
}
