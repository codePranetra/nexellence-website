"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { SITE } from "@/lib/constants";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding pb-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-brand-orange/20 bg-black p-12 text-center text-white md:p-16">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent" />
        <div className="relative">
          <h2 className="font-sans text-3xl font-bold md:text-5xl">
            Ready to grow your placement rate?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            We handle the backend—you focus on business. Partner with Nexellence for RPO support
            that scales with your agency.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton href={SITE.bookingUrl} size="lg" className="bg-brand-orange text-white">
              Start a Project <Phone className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="/services"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:border-brand-orange hover:text-brand-orange"
            >
              Explore Services <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
