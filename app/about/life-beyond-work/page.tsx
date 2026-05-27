import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/content-page";

export const metadata: Metadata = {
  title: "Life Beyond Work",
  description: "Discover the culture and lifestyle at Nexellence beyond the office.",
};

export default function LifeBeyondWorkPage() {
  return (
    <ContentPage
      label="About Us"
      title="Life Beyond Work"
      description="We believe great recruiters thrive when they have balance, community, and opportunities to recharge."
      body="From team events and wellness initiatives to flexible working arrangements, Nexellence supports a culture where people do their best work — and enjoy life outside of it. Our team celebrates wins together and supports each other through challenges."
      backHref="/about"
      backLabel="About Us"
    />
  );
}
