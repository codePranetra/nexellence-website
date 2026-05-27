"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { HERO_VIDEO } from "@/lib/constants";

export function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="section-padding section-y">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Nexellence"
          title="Recruitment in motion"
          description="See how we connect exceptional talent with organizations that value excellence."
          align="center"
          dark
        />
        <div className="relative overflow-hidden rounded-3xl glow-border border border-white/10">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="aspect-video w-full object-cover"
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
