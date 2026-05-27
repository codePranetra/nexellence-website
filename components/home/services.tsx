"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { revealOnScroll } from "@/animations/reveal";

export function Services() {
  useEffect(() => {
    revealOnScroll(".service-card", { stagger: 0.1 });
  }, []);

  return (
    <section className="section-padding section-y bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Recruitment"
          title="Solutions that scale with your hiring goals"
          description="Strategic talent acquisition across the full recruitment lifecycle — from sourcing to placement and beyond."
          dark
        />
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <motion.div
                className="service-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 transition-shadow hover:border-brand-orange/30 hover:shadow-glow"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-orange/5 transition group-hover:bg-brand-orange/10" />
                <span className="font-mono text-sm text-brand-orange">0{i + 1}</span>
                <h3 className="mt-2 font-sans text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-white/55">{service.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
