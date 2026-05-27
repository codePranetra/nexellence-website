"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";

export function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);

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
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="400px"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-brand-orange">
                  {post.category}
                </span>
                <h3 className="mt-2 font-sans text-lg font-bold text-white group-hover:text-brand-orange">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/55">{post.excerpt}</p>
                <p className="mt-4 text-xs text-white/40">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
