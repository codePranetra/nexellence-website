"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP } from "@/animations/gsap-config";
import { SectionHeading } from "@/components/shared/section-heading";
import { animateCounter } from "@/animations/reveal";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Value {
  title: string;
  description: string;
}

export function AboutClient({
  timeline,
  values,
}: {
  timeline: TimelineItem[];
  values: Value[];
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    animateCounter(counterRef.current, 900, "+");

    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        opacity: 0,
        x: -40,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={timelineRef} className="section-padding section-y bg-black text-white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading label="Timeline" title="Our journey" dark align="center" />
          <div className="relative border-l border-white/20 pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="timeline-item relative mb-12 last:mb-0">
                <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange">
                  <span className="h-2 w-2 rounded-full bg-black" />
                </span>
                <span className="font-mono text-sm text-brand-orange">{item.year}</span>
                <h3 className="mt-1 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-y">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Values" title="What we stand for" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/10 bg-[#111] p-6 text-center transition hover:border-brand-orange/30 hover:shadow-glow"
              >
                <h3 className="font-display font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <span
              ref={counterRef}
              className="font-display text-6xl font-bold text-gradient"
            >
              0+
            </span>
            <p className="mt-2 text-white/50">Projects delivered worldwide</p>
          </div>
        </div>
      </section>
    </>
  );
}
