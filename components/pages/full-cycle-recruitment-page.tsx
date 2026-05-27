"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Handshake,
  Mail,
  Phone,
  RefreshCw,
  Sparkles,
  UserSearch,
  Users,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { SITE } from "@/lib/constants";
import { FULL_CYCLE_RECRUITMENT_PAGE } from "@/lib/service-pages/full-cycle-recruitment";
import { cn } from "@/lib/utils";

const iconMap = {
  UserSearch,
  Mail,
  Phone,
  Calendar,
  Handshake,
} as const;

const page = FULL_CYCLE_RECRUITMENT_PAGE;

const lifecycleNodes = [
  { label: "Source", icon: UserSearch },
  { label: "Engage", icon: Mail },
  { label: "Screen", icon: Phone },
  { label: "Interview", icon: Calendar },
  { label: "Place", icon: Handshake },
];

export function FullCycleRecruitmentPage() {
  const [activeStep, setActiveStep] = useState(page.services.steps[0].id);

  const active =
    page.services.steps.find((s) => s.id === activeStep) ?? page.services.steps[0];
  const StepIcon = iconMap[active.icon as keyof typeof iconMap] ?? UserSearch;
  const activeIndex = page.services.steps.findIndex((s) => s.id === activeStep);

  return (
    <>
      <PageHero label="Services" title={page.title} description={page.intro} dark />

      {/* What is Full Cycle Recruitment */}
      <section className="section-padding pb-8 pt-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-brand-orange/25 bg-gradient-to-br from-brand-orange/10 via-[#111] to-black p-8 md:p-10"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-orange/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/20 ring-1 ring-brand-orange/30">
                <RefreshCw className="h-8 w-8 text-brand-orange" />
              </div>
              <div>
                <h2 className="font-sans text-2xl font-bold text-white md:text-3xl">
                  {page.whatIs.title}
                </h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-white/65">
                  {page.whatIs.description}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 hidden items-center justify-between gap-2 md:flex">
            {lifecycleNodes.map((node, i) => (
              <div key={node.label} className="flex flex-1 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-3 py-5"
                >
                  <node.icon className="h-5 w-5 text-brand-orange" />
                  <span className="text-center text-xs font-semibold text-white/80">
                    {node.label}
                  </span>
                </motion.div>
                {i < lifecycleNodes.length - 1 && (
                  <ArrowRight className="mx-1 h-4 w-4 shrink-0 text-brand-orange/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Cycle RPO Services — interactive process */}
      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="RPO Services"
            title={page.services.title}
            description={page.services.description}
            dark
          />

          <div className="mb-10 hidden md:block">
            <div className="flex justify-between gap-1">
              {page.services.steps.map((step, i) => (
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
                      "max-w-[88px] text-center text-[10px] font-medium leading-tight lg:text-xs",
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
                animate={{
                  width: `${((activeIndex + 1) / page.services.steps.length) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {page.services.steps.map((step, i) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap] ?? UserSearch;
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
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/15 ring-1 ring-brand-orange/25">
                      <StepIcon className="h-7 w-7 text-brand-orange" />
                    </div>
                    <span className="font-mono text-xs text-brand-orange">
                      Step {activeIndex + 1} of {page.services.steps.length}
                    </span>
                    <h3 className="mt-2 font-sans text-2xl font-bold text-white md:text-3xl">
                      {active.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
                      {active.description}
                    </p>
                    {"highlights" in active && active.highlights && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {active.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-center gap-2 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-3 py-1.5 text-xs text-brand-orange"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding section-y">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Benefits" title={page.benefits.title} align="center" dark />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.benefits.items.map((item, i) => {
              const icons = [Clock, Zap, Users, Sparkles];
              const Icon = icons[i] ?? CheckCircle2;
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

      {/* Why Choose */}
      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Why Us" title={page.whyChoose.title} align="center" dark />
          <div className="grid gap-6 md:grid-cols-3">
            {page.whyChoose.items.map((item, i) => {
              const icons = [Briefcase, Award, CheckCircle2];
              const Icon = icons[i] ?? CheckCircle2;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-[#111] p-8 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/15">
                    <Icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="section-padding pb-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid gap-0 overflow-hidden rounded-3xl border border-white/10 bg-[#111] lg:grid-cols-5"
          >
            <div className="flex flex-col justify-center bg-brand-orange p-8 lg:col-span-2">
              <RefreshCw className="mb-4 h-10 w-10 text-white" />
              <p className="font-mono text-xs uppercase tracking-widest text-white/80">RPO</p>
              <p className="mt-1 font-sans text-xl font-bold text-white">End-to-end hiring</p>
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
