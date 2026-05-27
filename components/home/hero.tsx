"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ArrowRight, Phone } from "lucide-react";
import { gsap } from "gsap";
import { HERO_VIDEO, SITE } from "@/lib/constants";
import { registerGSAP } from "@/animations/gsap-config";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-animate",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, sectionRef);

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const play = () => video.play().catch(() => undefined);
      play();
      video.addEventListener("loadeddata", play);
      return () => {
        ctx.revert();
        video.removeEventListener("loadeddata", play);
      };
    }
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl section-padding pt-32 pb-20 lg:pt-40">
        <div className="max-w-3xl">
          <div className="hero-animate mb-8">
            <BrandLogo variant="hero" priority />
          </div>

          <p className="hero-animate mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
            Recruitment · Talent · Growth
          </p>

          <h1 className="hero-animate font-sans text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Excellence in Talent.</span>
            <span className="block">
              Precision in{" "}
              <span className="text-gradient">Placement.</span>
            </span>
          </h1>

          <p className="hero-animate mt-6 max-w-2xl text-base font-normal leading-relaxed text-zinc-100 md:text-lg [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]">
            {SITE.description}
          </p>

          <div className="hero-animate mt-10 flex flex-wrap gap-5">
            <MagneticButton
              href={SITE.bookingUrl}
              size="xl"
              className="min-w-[200px] bg-brand-orange text-white shadow-glow hover:shadow-glow-lg sm:min-w-[240px]"
            >
              Start a Project
              <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            </MagneticButton>
            <MagneticButton
              href="/services"
              variant="outline"
              size="xl"
              className="min-w-[200px] border-2 border-white/30 sm:min-w-[240px]"
            >
              Our Services
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </MagneticButton>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-brand-orange/50 p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-brand-orange"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
