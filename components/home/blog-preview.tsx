import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPublishedBlogs } from "@/lib/blog-queries";
import { formatBlogDate } from "@/lib/format-date";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80";

export async function BlogPreview() {
  const posts = (await getPublishedBlogs({ limit: 3 })).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="section-padding section-y bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading label="Blog" title="Our latest blog" dark className="mb-0" />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:gap-3"
          >
            View all blog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition hover:border-brand-orange/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.thumbnail_image || FALLBACK_IMAGE}
                  alt={post.thumbnail_alt_text || post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="400px"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-brand-orange">
                  {post.category.name}
                </span>
                <h3 className="mt-2 font-sans text-lg font-bold text-white group-hover:text-brand-orange">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/55">
                  {post.short_description}
                </p>
                <p className="mt-4 text-xs text-white/40">
                  {formatBlogDate(post.published_at ?? post.created_at)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
