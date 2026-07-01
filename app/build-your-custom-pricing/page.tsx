import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { PricingWizard } from "@/components/pricing/pricing-wizard";

export const metadata: Metadata = {
  title: "Build Your Custom Pricing",
  description:
    "Hire smarter with TaaS — build a custom virtual talent plan tailored to your recruitment needs.",
};

export default function BuildCustomPricingPage() {
  return (
    <>
      <PageHero
        label="TaaS"
        title="Hire Smarter with TaaS – Custom Virtual Talent Plans"
        description="Answer a few questions to get your personalized estimate. No payment required — we'll contact you with next steps."
        dark
      />
      <section className="section-padding section-y bg-[#0a0a0a]">
        <PricingWizard />
      </section>
    </>
  );
}
