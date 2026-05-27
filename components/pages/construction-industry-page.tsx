"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building,
  Building2,
  CheckCircle2,
  Hammer,
  HardHat,
  Home,
  Landmark,
  Network,
  Settings2,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { CONSTRUCTION_PAGE, CONSTRUCTION_VIDEO } from "@/lib/industry-pages/construction";
import { cn } from "@/lib/utils";

const sectorIcons = {
  Home,
  Building2,
  Landmark,
  Building,
  Hammer,
} as const;

const page = CONSTRUCTION_PAGE;

const whyIcons = [HardHat, Network, Settings2, Zap];

export function ConstructionIndustryPage() {
  const [activeSector, setActiveSector] = useState(page.coverage.sectors[0].id);
  const showcaseVideoRef = useRef<HTMLVideoElement>(null);

  const sector =
    page.coverage.sectors.find((s) => s.id === activeSector) ?? page.coverage.sectors[0];
  const SectorIcon = sectorIcons[sector.icon as keyof typeof sectorIcons] ?? Building2;

  return (
    <>
      <PageHero
        label="Industries"
        title={page.title}
        description={page.intro}
        video={CONSTRUCTION_VIDEO}
        dark
      />

      {/* Video showcase */}
      <section className="section-padding pb-8 pt-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="In the field"
            title="Construction recruitment in action"
            description="See the projects and teams we support across residential, commercial, and civil construction."
            align="center"
            dark
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 glow-border">
            <video
              ref={showcaseVideoRef}
              muted
              loop
              playsInline
              preload="metadata"
              controls
              className="aspect-video w-full object-cover"
              onMouseEnter={() => showcaseVideoRef.current?.play().catch(() => undefined)}
            >
              <source src={CONSTRUCTION_VIDEO} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
              <HardHat className="h-4 w-4 text-brand-orange" />
              <span className="text-xs font-medium text-white/90">Construction highlights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industry coverage */}
      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Coverage"
            title={page.coverage.title}
            description={page.coverage.description}
            dark
          />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {page.coverage.sectors.map((item, i) => {
                const Icon = sectorIcons[item.icon as keyof typeof sectorIcons] ?? Building2;
                const isActive = activeSector === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSector(item.id)}
                    className={cn(
                      "flex min-w-[220px] shrink-0 items-center gap-3 rounded-xl border p-4 text-left transition-all lg:min-w-0 lg:w-full",
                      isActive
                        ? "border-brand-orange/50 bg-brand-orange/10"
                        : "border-white/10 bg-[#111] hover:border-white/20"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        isActive ? "bg-brand-orange text-white" : "bg-white/5 text-brand-orange"
                      )}
                    >
                      {isActive ? <Icon className="h-4 w-4" /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-semibold leading-snug",
                        isActive ? "text-white" : "text-white/60"
                      )}
                    >
                      {item.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35 }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                      priority={sector.id === "residential"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/90 ring-1 ring-white/20">
                      <SectorIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="relative p-8 md:p-10">
                    <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
                    <h3 className="font-sans text-2xl font-bold text-white md:text-3xl">
                      {sector.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
                      {sector.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="section-padding section-y">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Why Us" title={page.whyPartner.title} align="center" dark />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.whyPartner.items.map((item, i) => {
              const Icon = whyIcons[i] ?? CheckCircle2;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-white/10 bg-[#111] p-6 transition-colors hover:border-brand-orange/30"
                >
                  <Icon className="mb-4 h-5 w-5 text-brand-orange transition-transform group-hover:scale-110" />
                  <h3 className="font-sans font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Roles"
            title={page.roles.title}
            description={page.roles.description}
            dark
          />
          <div className="flex flex-wrap justify-center gap-3">
            {page.roles.items.map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-brand-orange/30 hover:text-white"
              >
                <Target className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                {role}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="section-padding pb-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid gap-0 overflow-hidden rounded-3xl border border-white/10 bg-[#111] lg:grid-cols-5"
          >
            <div className="flex flex-col justify-center bg-brand-orange p-8 lg:col-span-2">
              <Users className="mb-4 h-10 w-10 text-white" />
              <p className="font-sans text-lg font-bold text-white">Build your team</p>
            </div>
            <div className="flex flex-col justify-center p-8 lg:col-span-3">
              <h2 className="font-sans text-2xl font-bold text-white">{page.partner.title}</h2>
              <p className="mt-4 leading-relaxed text-white/65">{page.partner.description}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-white/70">{page.cta}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact" size="lg" className="bg-brand-orange text-white">
              Get in Touch
            </MagneticButton>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:gap-3"
            >
              All industries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
