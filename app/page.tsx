import { Hero } from "@/components/home/hero";
import { TrustedBy } from "@/components/home/trusted-by";
import { AIShowcase } from "@/components/home/ai-showcase";
import { StickyStory } from "@/components/home/sticky-story";
import { WhyChoose } from "@/components/home/why-choose";
import { OwnedTools } from "@/components/home/owned-tools";
import { HorizontalScroll } from "@/components/home/horizontal-scroll";
import { ClientFeedback } from "@/components/home/client-feedback";
import { Workflow } from "@/components/home/workflow";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { BlogPreview } from "@/components/home/blog-preview";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <AIShowcase />
      <StickyStory />
      <WhyChoose />
      <OwnedTools />
      <HorizontalScroll />
      <ClientFeedback />
      <Workflow />
      <Stats />
      <Testimonials />
      <BlogPreview />
      <CTASection />
    </>
  );
}
