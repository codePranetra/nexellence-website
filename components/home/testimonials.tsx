"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

function GoogleStars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
      ))}
    </div>
  );
}

function AvatarInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-sm font-bold text-brand-orange ring-2 ring-brand-orange/25">
      {initials}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/10 bg-[#111] p-6 md:p-7",
        "transition-colors hover:border-brand-orange/25 hover:shadow-[0_8px_32px_rgba(255,102,0,0.08)]"
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <AvatarInitials name={testimonial.author} />
          <div>
            <p className="font-semibold text-white">{testimonial.author}</p>
            <p className="text-sm text-white/50">{testimonial.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <GoogleStars count={testimonial.rating} />
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/35">
            Google Review
          </span>
        </div>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-white/75 md:text-[15px]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </motion.article>
  );
}

export function Testimonials() {
  return (
    <section className="section-padding section-y bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Testimonials"
          title="Our excellence, their words"
          description="Trusted by staffing leaders and recruitment professionals across the industry."
          align="center"
          dark
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/40">
          Reviews from partners on Google
        </p>
      </div>
    </section>
  );
}
