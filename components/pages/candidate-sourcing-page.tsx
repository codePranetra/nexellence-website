"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  LayoutGrid,
  ScanSearch,
  Search,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { SITE } from "@/lib/constants";
import { CANDIDATE_SOURCING_PAGE } from "@/lib/service-pages/candidate-sourcing";
import { cn } from "@/lib/utils";

const iconMap = {
  Code: Code2,
  Search: Search,
  LayoutGrid: LayoutGrid,
  Scan: ScanSearch,
} as const;

const page = CANDIDATE_SOURCING_PAGE;

export function CandidateSourcingPage() {
  const [activeCapability, setActiveCapability] = useState(page.capabilities[0].id);

  const active = page.capabilities.find((c) => c.id === activeCapability) ?? page.capabilities[0];
  const ActiveIcon = iconMap[active.icon as keyof typeof iconMap] ?? Search;

  return (
    <>
      <PageHero
        label="Services"
        title={page.title}
        description={page.intro}
        dark
      />

      {/* Why choose — interactive capability explorer */}
      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Expertise"
            title={page.whyChoose.title}
            description={page.whyChoose.description}
            dark
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Capability tabs */}
            <div className="flex flex-col gap-3 lg:col-span-5">
              {page.capabilities.map((cap, i) => {
                const Icon = iconMap[cap.icon as keyof typeof iconMap] ?? Search;
                const isActive = activeCapability === cap.id;
                return (
                  <motion.button
                    key={cap.id}
                    type="button"
                    onClick={() => setActiveCapability(cap.id)}
                    className={cn(
                      "group relative flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                      isActive
                        ? "border-brand-orange/50 bg-brand-orange/10 shadow-[0_0_32px_rgba(255,102,0,0.12)]"
                        : "border-white/10 bg-[#111] hover:border-white/20 hover:bg-white/[0.03]"
                    )}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                        isActive ? "bg-brand-orange text-white" : "bg-white/5 text-brand-orange"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs text-brand-orange/80">0{i + 1}</span>
                      <h3
                        className={cn(
                          "mt-1 font-sans text-base font-semibold leading-snug md:text-lg",
                          isActive ? "text-white" : "text-white/80"
                        )}
                      >
                        {cap.title}
                      </h3>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="cap-indicator"
                        className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-brand-orange"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Active capability detail */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 md:p-10"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-orange/15 blur-3xl"
                    aria-hidden
                  />
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/15 ring-1 ring-brand-orange/30">
                      <ActiveIcon className="h-7 w-7 text-brand-orange" />
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-white md:text-3xl">
                      {active.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
                      {active.description}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Precision", "Speed", "Quality"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-brand-orange/25 bg-brand-orange/10 px-3 py-1 text-xs font-medium text-brand-orange"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive approach */}
      <section className="section-padding section-y">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Approach" title={page.approach.title} align="center" dark />
          <div className="grid gap-6 md:grid-cols-3">
            {page.approach.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-white/10 bg-[#111] p-8 transition-colors hover:border-brand-orange/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 transition-colors group-hover:bg-brand-orange/20">
                  <CheckCircle2 className="h-6 w-6 text-brand-orange" />
                </div>
                <h3 className="font-sans text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner + stats strip */}
      <section className="section-padding pb-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-brand-orange/20 bg-gradient-to-br from-brand-orange/10 via-[#111] to-black p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,102,0,0.15),transparent_50%)]" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-xs font-medium text-brand-orange">
                  <Sparkles className="h-3.5 w-3.5" />
                  Superior talent discovery
                </div>
                <h2 className="font-sans text-2xl font-bold text-white md:text-3xl">
                  {page.partner.title}
                </h2>
                <p className="mt-4 leading-relaxed text-white/65">{page.partner.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "Niche & high-volume roles" },
                  { icon: Users, label: "Qualified talent pools" },
                  { icon: Search, label: "Hidden candidate access" },
                  { icon: Sparkles, label: "Faster, precise results" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-brand-orange" />
                    <span className="text-sm font-medium text-white/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-white/70">{page.cta}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton href={SITE.bookingUrl} size="lg" className="bg-brand-orange text-white">
              Start a Project
            </MagneticButton>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-orange hover:text-brand-orange"
            >
              All services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
