"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP } from "@/animations/gsap-config";

const nodes = ["Brief", "Source", "Screen", "Interview", "Place"];

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    gsap.from(".workflow-node", {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
    gsap.from(".workflow-line", {
      scaleX: 0,
      stagger: 0.15,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, []);

  return (
    <section className="section-padding section-y bg-[#0a0a0a]">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-orange">
          Hiring Workflow
        </span>
        <h2 className="mt-3 font-sans text-3xl font-bold text-white md:text-4xl">
          From role brief to successful placement
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-0">
          {nodes.map((node, i) => (
            <div key={node} className="flex items-center">
              <div className="workflow-node flex h-14 w-14 items-center justify-center rounded-full border border-brand-orange/40 bg-brand-orange/10 text-xs font-semibold text-brand-orange md:h-16 md:w-16 md:text-sm">
                {node}
              </div>
              {i < nodes.length - 1 && (
                <div className="workflow-line mx-1 hidden h-px w-8 origin-left bg-brand-orange/50 md:block md:w-12" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
