"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Users,
  RefreshCw,
  Database,
  TrendingUp,
  Star,
  Map,
  Layers,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { revealOnScroll } from "@/animations/reveal";

const iconMap: Record<string, React.ElementType> = {
  Users,
  RefreshCw,
  Database,
  TrendingUp,
  Star,
  Map,
  Layers,
};

const showcaseItems = SERVICES.slice(0, 6);

export function AIShowcase() {
  useEffect(() => {
    revealOnScroll(".service-showcase-card", { y: 32, stagger: 0.06 });
    revealOnScroll(".services-showcase-header", { y: 24, stagger: 0.08 });
  }, []);

  return (
    <section className="bg-[#0a0a0a] section-padding section-y">
      <div className="mx-auto max-w-7xl">
        <div className="services-showcase-header flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-14">
          <div className="lg:max-w-[52%]">
            <p className="mb-4 text-[15px] font-bold uppercase tracking-[0.22em] text-brand-orange">
              Our Services
            </p>
            <h2 className="font-sans text-[2.75rem] font-bold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
              RPO solutions
              <br />
              <span className="text-gradient">that scale with you</span>
            </h2>
          </div>

          <p className="font-sans text-xl font-normal leading-[1.65] text-white/60 sm:text-[1.35rem] lg:max-w-[42%] lg:text-[1.5rem]">
            From full-cycle recruitment to market mapping we help staffing agencies close more
            placements with skilled sourcers and AI-enhanced workflows.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {showcaseItems.map((item) => {
            const Icon = iconMap[item.icon] || Users;
            return (
              <Link
                key={item.id}
                href={`/services/${item.id}`}
                className="service-showcase-card group relative flex min-h-[260px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111] p-8 transition-all duration-300 hover:border-brand-orange/30 hover:shadow-[0_12px_40px_rgba(255,102,0,0.12)] lg:min-h-[280px]"
                data-cursor="pointer"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-orange/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-brand-orange/30 group-hover:bg-brand-orange/10">
                  <Icon className="h-5 w-5 text-brand-orange" strokeWidth={2} />
                </div>

                <h3 className="relative font-sans text-2xl font-bold text-white lg:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="relative mt-3 flex-1 font-sans text-base leading-relaxed text-white/55">
                  {item.description}
                </p>

                <span className="relative mt-6 inline-flex items-center gap-1.5 font-sans text-base font-medium text-brand-orange opacity-100 transition-all [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
                  Explore
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 text-center lg:mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-brand-orange transition hover:gap-3"
            data-cursor="pointer"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
