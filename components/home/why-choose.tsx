"use client";

import { RPO_BENEFITS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";

export function WhyChoose() {
  return (
    <section className="section-padding section-y bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="RPO Partner"
          title="Why you should choose Nexellence as your RPO partner"
          align="center"
          dark
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RPO_BENEFITS.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8"
            >
              <span className="font-mono text-sm text-brand-orange">0{i + 1}</span>
              <h3 className="mt-2 font-sans text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
