"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  FileSpreadsheet,
  Map,
  Send,
  Star,
  Target,
  TrendingUp,
  UserSearch,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { SITE } from "@/lib/constants";
import { MPC_PROJECT_PAGE } from "@/lib/service-pages/mpc-project";
import { cn } from "@/lib/utils";

const iconMap = {
  Briefcase,
  UserSearch,
  FileSpreadsheet,
  Send,
} as const;

const page = MPC_PROJECT_PAGE;

const flowNodes = [
  { label: "MPC Candidate", icon: Users },
  { label: "Job Openings", icon: Briefcase },
  { label: "Hiring Managers", icon: UserSearch },
  { label: "Placement", icon: Target },
];

export function MpcProjectPage() {
  const [activeStep, setActiveStep] = useState(page.expertise.steps[0].id);

  return (
    <>
      <PageHero label="Services" title={page.title} description={page.intro} dark />

      {/* What is Market Mapping */}
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
                <Map className="h-8 w-8 text-brand-orange" />
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

          {/* Visual flow */}
          <div className="mt-10 hidden items-center justify-between gap-2 md:flex">
            {flowNodes.map((node, i) => (
              <div key={node.label} className="flex flex-1 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 py-5"
                >
                  <node.icon className="h-6 w-6 text-brand-orange" />
                  <span className="text-center text-xs font-semibold text-white/80">
                    {node.label}
                  </span>
                </motion.div>
                {i < flowNodes.length - 1 && (
                  <ArrowRight className="mx-1 h-4 w-4 shrink-0 text-brand-orange/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise — interactive steps */}
      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="MPC Expertise"
            title={page.expertise.title}
            description={page.expertise.description}
            dark
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {page.expertise.steps.map((step, i) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] ?? Briefcase;
              const isActive = activeStep === step.id;
              return (
                <motion.button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={cn(
                    "relative rounded-2xl border p-6 text-left transition-all duration-300",
                    isActive
                      ? "col-span-1 border-brand-orange/50 bg-brand-orange/10 ring-1 ring-brand-orange/20 lg:col-span-2"
                      : "border-white/10 bg-[#111] hover:border-white/20",
                    isActive && "lg:p-8"
                  )}
                  layout
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                        isActive ? "bg-brand-orange text-white" : "bg-white/5 text-brand-orange"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs text-brand-orange">0{i + 1}</span>
                      <h3 className="mt-1 font-sans text-lg font-bold text-white">{step.title}</h3>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">
                            {step.description}
                          </p>
                          {"highlights" in step && step.highlights && (
                            <ul className="mt-4 flex flex-wrap gap-2">
                              {step.highlights.map((h) => (
                                <li
                                  key={h}
                                  className="rounded-full border border-brand-orange/25 bg-brand-orange/10 px-3 py-1 text-xs text-brand-orange"
                                >
                                  {h}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </div>
                    {!isActive && (
                      <span className="text-xs text-white/30">Click to expand</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile detail fallback when none expanded logic - actually click expands in place. Good. */}
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding section-y">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Benefits" title={page.benefits.title} align="center" dark />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.benefits.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-white/10 bg-[#111] p-6 transition-colors hover:border-brand-orange/30"
              >
                <Star className="mb-4 h-5 w-5 text-brand-orange transition-transform group-hover:scale-110" />
                <h3 className="font-sans font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
              </motion.div>
            ))}
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
            className="grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-[#111] lg:grid-cols-5"
          >
            <div className="flex flex-col justify-center bg-brand-orange p-8 lg:col-span-2">
              <TrendingUp className="mb-4 h-10 w-10 text-white" />
              <p className="font-mono text-xs uppercase tracking-widest text-white/80">MPC</p>
              <p className="mt-1 font-sans text-xl font-bold text-white">
                Most Placeable Candidates
              </p>
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
