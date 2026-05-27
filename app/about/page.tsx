import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/pages/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { HOW_WE_DELIVER, SITE, TIMELINE, VALUES, WHO_WE_ARE } from "@/lib/constants";
import { AboutClient } from "./client";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name} — founded by ${SITE.founder} with 15+ years in recruitment and RPO excellence.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Excellence in every placement"
        description={SITE.founderBio}
        dark
      />
      <section className="section-padding section-y">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading label={WHO_WE_ARE.title} title="Your strategic RPO partner" dark />
            {WHO_WE_ARE.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mb-4 text-white/70 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl glow-border lg:mx-0">
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
              alt="Nexellence team"
              fill
              className="object-cover"
              sizes="500px"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-y bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Process" title={HOW_WE_DELIVER.title} align="center" dark />
          <div className="mx-auto max-w-3xl space-y-6">
            {HOW_WE_DELIVER.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-center text-white/70 leading-relaxed md:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <AboutClient timeline={TIMELINE} values={VALUES} />

      <section className="section-padding section-y">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading label="Founder" title={`Meet ${SITE.founder}`} align="center" dark />
          <div className="glass-dark glow-border mx-auto max-w-lg rounded-2xl p-8">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
                alt={SITE.founder}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 font-sans text-xl font-bold text-white">{SITE.founder}</h3>
            <p className="text-sm text-brand-orange">Founder, Nexellence</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{SITE.founderBio}</p>
          </div>
        </div>
      </section>
    </>
  );
}
