import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CAREER } from "@/lib/constants";
import { CareerClients } from "./client";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Join Nexellence — current openings for Research Analyst, Recruitment Associate, Quality Associate, and Operations Manager.",
};

export default function CareerPage() {
  return (
    <>
      <PageHero
        label="Career"
        title="Current job openings"
        description="Grow your career with Nexellence. We are actively hiring talented professionals to join our recruitment and operations team."
        dark
      />

      <section className="section-padding section-y">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-sans text-2xl font-bold text-white md:text-3xl">
            We are actively hiring for:
          </h2>
          <ul className="mt-8 space-y-4">
            {CAREER.openings.map((role, i) => (
              <li
                key={role}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111] px-6 py-5"
              >
                <span className="font-mono text-sm text-brand-orange">0{i + 1}</span>
                <span className="font-sans text-lg font-semibold text-white">{role}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl border border-brand-orange/20 bg-brand-orange/5 p-8 text-center">
            <p className="text-white/70">To apply, send us your resume at</p>
            <a
              href={`mailto:${CAREER.hrEmail}`}
              className="mt-3 inline-flex items-center gap-2 font-sans text-xl font-bold text-brand-orange hover:underline"
            >
              <Mail className="h-5 w-5" />
              {CAREER.hrEmail}
            </a>
            <div className="mt-6">
              <MagneticButton
                href={`mailto:${CAREER.hrEmail}?subject=Job Application - Nexellence`}
                className="bg-brand-orange text-white"
              >
                Apply via Email
              </MagneticButton>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-white/50">
            <Link href="/about" className="text-brand-orange hover:underline">
              ← Back to About Us
            </Link>
          </p>
        </div>
      </section>

      <CareerClients />
    </>
  );
}
