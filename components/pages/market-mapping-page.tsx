"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Globe,
  List,
  Mail,
  Map,
  Share2,
  Sparkles,
  Target,
} from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { SITE } from "@/lib/constants";
import { MARKET_MAPPING_PAGE } from "@/lib/service-pages/market-mapping";
import { cn } from "@/lib/utils";

const pillarIcons = { List, Target } as const;

const serviceIcons = {
  Globe,
  Share2,
  Mail,
  Briefcase,
} as const;

const page = MARKET_MAPPING_PAGE;

export function MarketMappingPage() {
  const [activeService, setActiveService] = useState(
    page.additionalServices.items[0].id
  );

  const active =
    page.additionalServices.items.find((s) => s.id === activeService) ??
    page.additionalServices.items[0];
  const ActiveIcon = serviceIcons[active.icon as keyof typeof serviceIcons] ?? Globe;
  const activeIndex = page.additionalServices.items.findIndex(
    (s) => s.id === activeService
  );

  return (
    <>
      <PageHero label="Services" title={page.title} description={page.intro} dark />

      {/* Market Mapping pillars */}
      <section className="section-padding pb-8 pt-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Core Service"
            title={page.marketMapping.title}
            description={page.marketMapping.description}
            dark
          />
          <div className="grid gap-6 md:grid-cols-2">
            {page.marketMapping.pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons] ?? List;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 transition-colors hover:border-brand-orange/30"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-orange/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/15 ring-1 ring-brand-orange/25">
                      <Icon className="h-7 w-7 text-brand-orange" />
                    </div>
                    <h3 className="font-sans text-xl font-bold text-white">{pillar.title}</h3>
                    <p className="mt-3 leading-relaxed text-white/60">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional services — interactive panel */}
      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Value-Added"
            title={page.additionalServices.title}
            description={page.additionalServices.description}
            dark
          />

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {page.additionalServices.items.map((item, i) => {
                const Icon = serviceIcons[item.icon as keyof typeof serviceIcons] ?? Globe;
                const isActive = activeService === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveService(item.id)}
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
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35 }}
                  className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 md:p-10"
                >
                  <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/15 ring-1 ring-brand-orange/25">
                      <ActiveIcon className="h-7 w-7 text-brand-orange" />
                    </div>
                    <span className="font-mono text-xs text-brand-orange">
                      Service {activeIndex + 1} of {page.additionalServices.items.length}
                    </span>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <h3 className="font-sans text-2xl font-bold text-white md:text-3xl">
                        {active.title}
                      </h3>
                      {"badge" in active && active.badge && (
                        <span className="rounded-full border border-brand-orange/30 bg-brand-orange/15 px-3 py-1 text-xs font-semibold text-brand-orange">
                          {active.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
                      {active.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding section-y">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Why Us" title={page.whyChoose.title} align="center" dark />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.whyChoose.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-white/10 bg-[#111] p-6 transition-colors hover:border-brand-orange/30"
              >
                <CheckCircle2 className="mb-4 h-5 w-5 text-brand-orange transition-transform group-hover:scale-110" />
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
            className="grid gap-0 overflow-hidden rounded-3xl border border-white/10 bg-[#111] lg:grid-cols-5"
          >
            <div className="flex flex-col justify-center bg-gradient-to-br from-brand-orange to-orange-700 p-8 lg:col-span-2">
              <Map className="mb-4 h-10 w-10 text-white" />
              <Sparkles className="mb-2 h-5 w-5 text-white/80" />
              <p className="font-sans text-lg font-bold text-white">Integrated recruitment support</p>
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
