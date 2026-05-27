"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/constants";
import { pinHorizontalSection } from "@/animations/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

/** Shorter copy for carousel cards so text stays fully visible while scrolling */
const CARD_DESCRIPTIONS: Record<string, string> = {
  construction: "Residential, commercial, civil & multi-family—from trades to leadership.",
  manufacturing: "Automation, semiconductors, automotive & engineering talent.",
  "food-and-beverages": "Production, food safety, supply chain & retail operations.",
  "it-and-iot": "Cybersecurity, cloud, software, networking & IoT professionals.",
  "supply-chain": "Logistics, warehousing, procurement & transportation experts.",
  pharmaceutical: "Pharma, biotech, clinical research & life sciences roles.",
  "legal-and-finance": "Legal, finance, accounting, banking & compliance specialists.",
};

export function HorizontalScroll() {
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = pinHorizontalSection(
      pinRef.current,
      trackRef.current,
      viewportRef.current,
      { start: "top 12%" }
    );
    return cleanup;
  }, []);

  return (
    <section className="relative bg-black">
      {/* Pinned block: heading stays visible while cards scroll horizontally */}
      <div
        ref={pinRef}
        className="flex min-h-[calc(100vh-72px)] flex-col bg-black"
      >
        <div className="section-padding shrink-0 pb-4 pt-8 md:pt-12">
          <SectionHeading
            label="Industries"
            title="Industries we are specialized in"
            description="Construction, manufacturing, food & beverages, IT & IoT, supply chain, pharmaceutical, and legal & finance."
            dark
          />
        </div>

        <div
          ref={viewportRef}
          className="relative min-h-[420px] flex-1 overflow-hidden pb-4"
        >
          <div
            ref={trackRef}
            className="flex h-full items-stretch gap-6 px-4 sm:px-8"
            style={{ width: "max-content" }}
          >
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="group relative flex h-full min-h-[400px] w-[85vw] max-w-md flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 md:min-h-[440px] md:w-[400px]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                </div>
                <div className="relative z-10 mt-auto w-full px-6 pb-8 pt-24 text-white md:pt-28">
                  <span className="font-mono text-xs uppercase tracking-wider text-brand-orange">
                    Industry
                  </span>
                  <h3 className="mt-1 font-sans text-2xl font-bold leading-tight">
                    {industry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    {CARD_DESCRIPTIONS[industry.id] ?? industry.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
