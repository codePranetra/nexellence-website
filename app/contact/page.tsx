import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { ContactClient } from "./client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nexellence for recruitment services, hiring inquiries, and partnerships.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's find your next great hire"
        description="Tell us about your hiring needs. We'll respond within 24 hours with a tailored approach."
        dark
      />
      <ContactClient />
    </>
  );
}
