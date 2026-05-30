import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { BlogArticleClient } from "./client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <BlogArticleClient title={post.title} />
      <article className="section-padding pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-brand-orange"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="mt-8 block text-sm font-medium text-brand-orange">
            {post.category} · {post.date} · {post.readTime}
          </span>
          <h1 className="mt-4 max-w-5xl font-sans text-3xl font-bold leading-tight text-white md:text-5xl">
            {post.title}
          </h1>
          <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="blog-content mt-10 w-full max-w-none">
            <p className="text-xl leading-relaxed text-white/90">{post.excerpt}</p>
            <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
              The hiring landscape has changed significantly in recent years, making recruitment
              more challenging for businesses across different industries. Organizations that invest
              in structured RPO partnerships are positioning themselves for faster, higher-quality
              placements.
            </p>
            <h2 className="mt-10 font-sans text-2xl font-bold text-white md:text-3xl">
              Key Takeaways
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-relaxed text-white/70 md:text-lg">
              <li>End-to-end recruitment support reduces time-to-hire across roles</li>
              <li>AI-enhanced sourcing improves candidate quality and outreach accuracy</li>
              <li>Structured screening creates consistent, repeatable hiring outcomes</li>
              <li>Strong RPO partnerships scale with your agency&apos;s growth goals</li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
              At Nexellence, we partner with staffing and recruitment agencies to navigate this
              transformation—from sourcing and outreach through placement and ongoing support.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
