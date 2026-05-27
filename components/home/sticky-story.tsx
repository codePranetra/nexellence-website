"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/animations/gsap-config";
import { SectionHeading } from "@/components/shared/section-heading";
import { HOW_WE_DELIVER, SITE, WHO_WE_ARE } from "@/lib/constants";

export function StickyStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(".story-progress", {
              width: `${((i + 1) / panels.length) * 100}%`,
              duration: 0.4,
            });
          },
          onEnterBack: () => {
            gsap.to(".story-progress", {
              width: `${((i + 1) / panels.length) * 100}%`,
              duration: 0.4,
            });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding section-y">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="About"
          title={WHO_WE_ARE.title}
          description={SITE.founderBio}
        />
        <p className="mb-12 max-w-4xl text-white/70 leading-relaxed">
          {WHO_WE_ARE.paragraphs[0]}
        </p>

        <SectionHeading label="Process" title={HOW_WE_DELIVER.title} />
        <div className="mb-8 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="story-progress h-full w-0 rounded-full bg-brand-orange transition-all" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {HOW_WE_DELIVER.paragraphs.map((paragraph, i) => (
            <div
              key={i}
              className="story-panel rounded-2xl border border-white/10 bg-[#111] p-8"
            >
              <span className="font-mono text-sm text-brand-orange">0{i + 1}</span>
              <p className="mt-3 text-white/60 leading-relaxed">{paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
