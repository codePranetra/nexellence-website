"use client";

import Image from "next/image";
import { Cpu } from "lucide-react";
import { OWNED_TOOLS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";

export function OwnedTools() {
  return (
    <section className="section-padding section-y">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Technology"
          title="Proudly owned tools"
          description="Proprietary platforms built to power precision sourcing, VA tracking, and recruitment excellence."
          align="center"
          dark
        />
        <div className="grid gap-6 md:grid-cols-3">
          {OWNED_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border border-white/10 bg-[#111] p-8 text-center transition hover:border-brand-orange/30 hover:shadow-glow"
            >
              <div className="mx-auto mb-5 flex h-16 items-center justify-center">
                {"image" in tool && tool.image ? (
                  <Image
                    src={tool.image}
                    alt={`${tool.name} logo`}
                    width={220}
                    height={70}
                    className="h-12 w-auto object-contain"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10">
                    <Cpu className="h-7 w-7 text-brand-orange" />
                  </div>
                )}
              </div>
              <h3 className="font-sans text-xl font-bold text-white">{tool.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-orange">{tool.subtitle}</p>
              <p className="mt-3 text-sm text-white/55">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
