"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { splitTextReveal } from "@/animations/reveal";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  video?: string;
  dark?: boolean;
}

export function PageHero({
  label,
  title,
  description,
  video,
  dark = true,
}: PageHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const cleanup = splitTextReveal(titleRef.current);
    return cleanup;
  }, []);

  return (
    <section
      className={`relative flex min-h-[50vh] items-center overflow-hidden pt-28 pb-16 ${
        dark ? "bg-black text-white" : "bg-background"
      }`}
    >
      {video && (
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover opacity-25">
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/5 via-transparent to-black/60" />
      <div className="relative z-10 mx-auto w-full max-w-7xl section-padding">
        <motion.span
          className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {label}
        </motion.span>
        <h1
          ref={titleRef}
          className="mt-4 font-sans text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          {title}
        </h1>
        {description && (
          <motion.p
            className="mt-6 max-w-2xl text-lg text-white/65"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
