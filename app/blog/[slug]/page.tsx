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
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-electric"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="mt-8 block text-sm font-medium text-brand-electric">
            {post.category} · {post.date} · {post.readTime}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold md:text-5xl leading-tight">
            {post.title}
          </h1>
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
          <div className="prose prose-lg mt-10 max-w-none text-muted-foreground">
            <p className="text-xl text-foreground leading-relaxed">{post.excerpt}</p>
            <p className="mt-6">
              The enterprise AI landscape is evolving at unprecedented speed. Organizations that
              invest in intelligent systems today are positioning themselves for exponential
              competitive advantage tomorrow.
            </p>
            <h2 className="mt-10 font-display text-2xl font-bold text-foreground">
              Key Takeaways
            </h2>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>AI-native architecture reduces time-to-value by 60%</li>
              <li>Autonomous agents are becoming production-ready at scale</li>
              <li>Responsible AI frameworks build lasting customer trust</li>
              <li>Integration strategy determines long-term ROI</li>
            </ul>
            <p className="mt-6">
              At Code Pranetra, we partner with enterprises to navigate this transformation —
              from strategy through deployment and continuous optimization.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
