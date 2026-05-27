"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { revealOnScroll } from "@/animations/reveal";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll("[data-reveal]");
    els.forEach((el, i) => {
      el.setAttribute("data-reveal-id", String(i));
    });
    revealOnScroll("[data-reveal]", { y: 40, stagger: 0.1 });
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {label && (
        <span
          data-reveal
          className={cn(
            "mb-3 inline-block font-mono text-xs uppercase tracking-[0.25em]",
            "text-brand-orange"
          )}
        >
          {label}
        </span>
      )}
      <h2
        data-reveal
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1]",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            dark ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
