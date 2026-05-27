"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import {
  ABOUT_NAV,
  INDUSTRIES_NAV,
  MAIN_NAV,
  SERVICES_NAV,
} from "@/lib/navigation";
import {
  FOOTER_MISSION,
  FOOTER_SERVICES,
  FOOTER_WHAT_WE_DO_EXTRA,
  SITE,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

const brandWatermark = SITE.name.toUpperCase();

export function Footer() {
  return (
    <footer className="relative overflow-x-hidden border-t border-white/10 bg-black text-white">
      <div className="relative z-10 section-padding pb-8 pt-20 md:pb-10 md:pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <BrandLogo variant="footer" />
              <h3 className="mt-8 font-sans text-lg font-semibold">What we do</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                {SITE.description}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
                {FOOTER_WHAT_WE_DO_EXTRA}
              </p>
              <div className="mt-6">
                <MagneticButton href={SITE.bookingUrl} className="bg-brand-orange text-white">
                  Start a Project
                </MagneticButton>
              </div>
            </div>

            <div className="glass-dark rounded-2xl p-6 glow-border">
              <h3 className="font-sans text-lg font-semibold">Subscribe to our newsletter</h3>
              <p className="mt-2 text-sm text-white/50">
                Get latest updates &amp; exclusive offers.
              </p>
              <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-brand-orange/50 focus:ring-2 focus:ring-brand-orange/20"
                />
                <Button type="submit" className="shrink-0 rounded-full px-6">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

          <div className="mb-12 rounded-2xl border border-white/10 bg-[#111] p-8">
            <h3 className="font-sans text-lg font-semibold text-brand-orange">Our mission</h3>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/60">{FOOTER_MISSION}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-orange">
                Company
              </h4>
              <ul className="space-y-2">
                {MAIN_NAV.filter((l) => !l.children).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/about" className="text-sm text-white/50 hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-orange">
                Our services
              </h4>
              <ul className="space-y-2">
                {FOOTER_SERVICES.map((s) => (
                  <li key={s} className="text-sm text-white/50">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-orange">
                RPO services
              </h4>
              <ul className="space-y-2">
                {SERVICES_NAV.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-orange">
                Industries
              </h4>
              <ul className="space-y-2">
                {INDUSTRIES_NAV.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-orange">
                Contact
              </h4>
              <ul className="space-y-2">
                {ABOUT_NAV.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Animated glowing brand watermark + copyright */}
      <div className="section-padding border-t border-white/5 pb-6 pt-6 md:pb-8 md:pt-8">
        <div className="footer-brand-section" aria-hidden>
          <span className="footer-brand-glow footer-brand-glow--a font-sans">{brandWatermark}</span>
          <span className="footer-brand-glow footer-brand-glow--b font-sans">{brandWatermark}</span>
          <p className="footer-brand-watermark font-sans">{brandWatermark}</p>
        </div>
        <div className="mx-auto mt-3 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 sm:mt-4 sm:flex-row">
          <p className="text-xs text-white/40">
            © www.nexellence.net. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <a
              href="https://codepranetra.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Website design &amp; developed by{" "}
              <span className="text-brand-orange hover:text-brand-orange-light">code pranetra</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
