"use client";

import { useEffect, useRef } from "react";
import { STATS } from "@/lib/constants";
import { animateCounter } from "@/animations/reveal";

export function Stats() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    STATS.forEach((stat, i) => {
      animateCounter(refs.current[i], stat.value, stat.suffix);
    });
  }, []);

  return (
    <section className="section-padding py-16 border-y border-border">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="text-center">
            <span
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="font-display text-4xl font-bold text-gradient md:text-5xl"
            >
              0{stat.suffix}
            </span>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
