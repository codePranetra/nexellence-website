import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/pages/page-hero";
import { INDUSTRIES, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industries",
  description: `Industry-focused recruitment by ${SITE.name} across construction, pharma, IT, finance, and more.`,
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industries"
        title="Sector expertise you can trust"
        description="Specialized talent networks and recruitment knowledge across seven key industry verticals."
        dark
      />
      <section className="section-padding section-y">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.id}`}
              className="group rounded-2xl border border-white/10 bg-[#111] p-8 transition hover:border-brand-orange/30 hover:shadow-glow"
            >
              <h2 className="font-sans text-xl font-bold text-white group-hover:text-brand-orange">
                {industry.title}
              </h2>
              <p className="mt-3 text-sm text-white/60">{industry.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
