"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PRIVACY_POLICY } from "@/lib/legal/privacy-policy";

export function PrivacyPolicyPage() {
  const policy = PRIVACY_POLICY;

  return (
    <>
      <PageHero
        label="Legal"
        title={policy.title}
        description={`${policy.company} — how we collect, use, and protect your information.`}
        dark
      />

      <section className="section-padding section-y">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex gap-4 rounded-2xl border border-brand-orange/25 bg-brand-orange/10 p-6"
          >
            <Shield className="h-8 w-8 shrink-0 text-brand-orange" />
            <p className="leading-relaxed text-white/75">{policy.intro}</p>
          </motion.div>

          <div className="space-y-10">
            {policy.sections.map((section, i) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-white/10 pb-10 last:border-0"
              >
                <h2 className="font-sans text-xl font-bold text-white md:text-2xl">
                  {section.title}
                </h2>
                {"paragraphs" in section &&
                  section.paragraphs?.map((p) => (
                    <p key={p} className="mt-4 leading-relaxed text-white/65">
                      {p}
                    </p>
                  ))}
                {"items" in section && section.items && (
                  <ul className="mt-4 space-y-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-white/65 md:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-10">
            <MagneticButton href="/contact" size="lg" className="bg-brand-orange text-white">
              Contact Us
            </MagneticButton>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:gap-3"
            >
              Back to home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
