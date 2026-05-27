import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SITE } from "@/lib/constants";

interface ContentPageProps {
  label: string;
  title: string;
  description: string;
  body?: string;
  backHref: string;
  backLabel: string;
}

export function ContentPage({
  label,
  title,
  description,
  body,
  backHref,
  backLabel,
}: ContentPageProps) {
  return (
    <>
      <PageHero label={label} title={title} description={description} dark />
      <section className="section-padding section-y">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-white/70">
            {body ?? description}
          </p>
          <p className="mt-6 text-white/50">
            Partner with Nexellence to build a tailored approach for your organization. Our
            consultants bring deep industry expertise and a proven methodology to every engagement.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href={SITE.bookingUrl} size="lg" className="bg-brand-orange text-white">
              Start a Project
            </MagneticButton>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:gap-3"
            >
              {backLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
