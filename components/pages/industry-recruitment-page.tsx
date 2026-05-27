"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Calculator,
  Car,
  Cpu,
  Factory,
  FileSearch,
  Landmark,
  LucideIcon,
  Network,
  Scale,
  Settings2,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Target,
  TrendingUp,
  Truck,
  UtensilsCrossed,
  Wrench,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/shared/section-heading";
import type { IndustryPageContent } from "@/lib/industry-pages/types";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Scale,
  TrendingUp,
  Calculator,
  Shield,
  Landmark,
  ShieldCheck,
  FileSearch,
  Factory,
  Bot,
  Cpu,
  Zap,
  Car,
  Wrench,
  UtensilsCrossed,
  Truck,
  ShoppingBag,
  Network,
  Settings2,
  Target,
};

function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Factory;
}

type Props = { page: IndustryPageContent };

export function IndustryRecruitmentPage({ page }: Props) {
  const [activeSector, setActiveSector] = useState(page.coverage.sectors[0].id);

  const sector =
    page.coverage.sectors.find((s) => s.id === activeSector) ?? page.coverage.sectors[0];
  const HighlightIcon = getIcon(page.highlight.icon);
  const SectorIcon = getIcon(sector.icon);
  const PartnerIcon = getIcon(page.partnerIcon);
  const sectorGridCols =
    page.coverage.sectors.length >= 7
      ? "sm:grid-cols-4 lg:grid-cols-7"
      : page.coverage.sectors.length === 5
        ? "sm:grid-cols-3 md:grid-cols-5"
        : "sm:grid-cols-2 md:grid-cols-4";

  return (
    <>
      <PageHero label="Industries" title={page.title} description={page.intro} dark />

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
                <HighlightIcon className="h-8 w-8 text-brand-orange" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
                  {page.highlight.label}
                </p>
                <p className="mt-2 max-w-3xl text-lg leading-relaxed text-white/70">
                  {page.highlight.description}
                </p>
              </div>
            </div>
          </motion.div>

          <div className={cn("mt-8 grid grid-cols-2 gap-3", sectorGridCols)}>
            {page.coverage.sectors.map((s, i) => {
              const Icon = getIcon(s.icon);
              const shortLabel =
                s.id === "msp"
                  ? "MSP"
                  : s.title.includes("(")
                    ? s.title.split("(")[0].trim().split(" ")[0]
                    : s.title.split(" ")[0];
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-2 py-4 text-center"
                >
                  <Icon className="h-5 w-5 text-brand-orange" />
                  <span className="text-[10px] font-semibold leading-tight text-white/70 sm:text-xs">
                    {shortLabel}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Sectors"
            title={page.coverage.title}
            description={page.coverage.description}
            dark
          />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {page.coverage.sectors.map((item, i) => {
                const Icon = getIcon(item.icon);
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
                  className="relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 md:p-10"
                >
                  <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/15 ring-1 ring-brand-orange/25">
                      <SectorIcon className="h-7 w-7 text-brand-orange" />
                    </div>
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

      <section className="section-padding section-y">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Why Us" title={page.whyChoose.title} align="center" dark />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.whyChoose.items.map((item, i) => {
              const Icon = getIcon(page.whyIcons[i] ?? "CheckCircle2");
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

      <section className="section-padding pb-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid gap-0 overflow-hidden rounded-3xl border border-white/10 bg-[#111] lg:grid-cols-5"
          >
            <div className="flex flex-col justify-center bg-brand-orange p-8 lg:col-span-2">
              <PartnerIcon className="mb-4 h-10 w-10 text-white" />
              <p className="font-sans text-lg font-bold text-white">{page.partner.sideLabel}</p>
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
              Contact Us
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
