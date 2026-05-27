"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Briefcase,
  CheckCircle2,
  Mail,
  Rocket,
  Share2,
  TrendingUp,
  UserSearch,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { SITE } from "@/lib/constants";
import { BUSINESS_DEVELOPMENT_PAGE } from "@/lib/service-pages/business-development";
import { cn } from "@/lib/utils";

const iconMap = {
  Briefcase,
  UserSearch,
  Mail,
  TrendingUp,
  Bell,
  Share2,
} as const;

const page = BUSINESS_DEVELOPMENT_PAGE;

export function BusinessDevelopmentPage() {
  const [activeStep, setActiveStep] = useState(page.process.steps[0].id);

  const active =
    page.process.steps.find((s) => s.id === activeStep) ?? page.process.steps[0];
  const StepIcon = iconMap[active.icon as keyof typeof iconMap] ?? Briefcase;
  const activeIndex = page.process.steps.findIndex((s) => s.id === activeStep);

  return (
    <>
      <PageHero label="Services" title={page.title} description={page.intro} dark />

      {/* Process — step navigator + detail panel */}
      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Process"
            title={page.process.title}
            description={page.process.description}
            dark
          />

          {/* Progress bar */}
          <div className="mb-10 hidden md:block">
            <div className="flex justify-between gap-1">
              {page.process.steps.map((step, i) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className="group flex flex-1 flex-col items-center gap-2"
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all",
                      i <= activeIndex
                        ? "border-brand-orange bg-brand-orange text-white"
                        : "border-white/20 bg-[#111] text-white/40 group-hover:border-white/40"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "max-w-[90px] text-center text-[10px] font-medium leading-tight lg:text-xs",
                      activeStep === step.id ? "text-brand-orange" : "text-white/40"
                    )}
                  >
                    {step.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-brand-orange"
                animate={{ width: `${((activeIndex + 1) / page.process.steps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Mobile / side step list */}
            <div className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {page.process.steps.map((step, i) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap] ?? Briefcase;
                const isActive = activeStep === step.id;
                return (
                  <motion.button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(step.id)}
                    className={cn(
                      "flex min-w-[200px] shrink-0 items-center gap-3 rounded-xl border p-4 text-left transition-all lg:min-w-0 lg:w-full",
                      isActive
                        ? "border-brand-orange/50 bg-brand-orange/10"
                        : "border-white/10 bg-[#111] hover:border-white/20"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
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
                      {step.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35 }}
                  className="relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 md:p-10"
                >
                  <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />

                  <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/15 ring-1 ring-brand-orange/25">
                        <StepIcon className="h-7 w-7 text-brand-orange" />
                      </div>
                      <span className="font-mono text-xs text-brand-orange">
                        Step {activeIndex + 1} of {page.process.steps.length}
                      </span>
                      <h3 className="mt-2 font-sans text-2xl font-bold text-white md:text-3xl">
                        {active.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
                        {active.description}
                      </p>

                      {"highlights" in active && active.highlights && (
                        <ul className="mt-6 space-y-2">
                          {active.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2 text-sm text-white/70">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-orange" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {"stat" in active && active.stat && (
                      <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-8 py-6 text-center md:min-w-[160px]">
                        <span className="font-sans text-4xl font-bold text-brand-orange md:text-5xl">
                          {active.stat}
                        </span>
                        <span className="mt-1 text-sm text-white/60">{active.statLabel}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section-padding section-y">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Benefits" title={page.whyChoose.title} align="center" dark />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.whyChoose.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-[#111] p-6 transition-colors hover:border-brand-orange/30"
              >
                <Zap className="mb-4 h-6 w-6 text-brand-orange" />
                <h3 className="font-sans font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA block */}
      <section className="section-padding pb-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-brand-orange/20 bg-gradient-to-br from-[#111] via-black to-black p-8 md:p-12"
          >
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-brand-orange/10 to-transparent" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 text-brand-orange">
                  <Rocket className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Growth</span>
                </div>
                <h2 className="font-sans text-2xl font-bold text-white md:text-3xl">
                  {page.partner.title}
                </h2>
                <p className="mt-4 leading-relaxed text-white/65">{page.partner.description}</p>
              </div>
              <MagneticButton href="/contact" size="lg" className="shrink-0 bg-brand-orange text-white">
                Get Started
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-white/70">{page.cta}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton href={SITE.bookingUrl} size="lg" className="bg-brand-orange text-white">
              Start a Project
            </MagneticButton>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:gap-3"
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
