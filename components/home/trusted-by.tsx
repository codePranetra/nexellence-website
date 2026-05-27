"use client";

import { OUR_PROMISE } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";

export function TrustedBy() {
  return (
    <section className="section-padding section-y border-y border-white/10 bg-[#0a0a0a]">
      <SectionHeading
        label="Our Promise"
        title="Our promise to you"
        align="center"
        dark
      />
      <div className="mx-auto max-w-6xl overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-12">
          {[...OUR_PROMISE, ...OUR_PROMISE].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex-shrink-0 font-sans text-lg font-semibold text-white/40 transition-colors hover:text-brand-orange md:text-xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
