import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/pages/page-hero";
import { SERVICES } from "@/lib/constants";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: `Recruitment services by ${SITE.name} — sourcing, full-cycle hiring, ATS management, and more.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Recruitment solutions that deliver"
        description="End to end and specialized hiring services designed for enterprise teams and growing organizations."
        dark
      />
      <section className="section-padding section-y">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group rounded-2xl border border-white/10 bg-[#111] p-8 transition hover:border-brand-orange/30 hover:shadow-glow"
            >
              <h2 className="font-sans text-xl font-bold text-white group-hover:text-brand-orange">
                {service.title}
              </h2>
              <p className="mt-3 text-sm text-white/60">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
