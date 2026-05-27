import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { BLOG_POSTS } from "@/lib/constants";
import { BlogClient } from "./client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Recruitment insights, hiring strategies, and industry perspectives from Nexellence.",
};

export default function BlogPage() {
  const featured = BLOG_POSTS.find((p) => p.featured)!;
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        label="Blog"
        title="Insights from the talent frontier"
        description="Editorial perspectives on recruitment, hiring strategy, and workforce trends."
        dark
      />
      <section className="section-padding pb-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-[21/9] min-h-[280px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />
              <div className="absolute bottom-0 p-8 md:p-12 text-white">
                <span className="rounded-full bg-brand-cyan/20 px-3 py-1 text-xs font-medium text-brand-cyan">
                  Featured · {featured.category}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold md:text-4xl max-w-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-xl text-white/70">{featured.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-cyan">
                  Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <BlogClient posts={rest} />
    </>
  );
}
