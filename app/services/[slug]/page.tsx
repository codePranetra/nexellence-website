import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/pages/content-page";
import { BusinessDevelopmentPage } from "@/components/pages/business-development-page";
import { CandidateSourcingPage } from "@/components/pages/candidate-sourcing-page";
import { FullCycleRecruitmentPage } from "@/components/pages/full-cycle-recruitment-page";
import { MarketMappingPage } from "@/components/pages/market-mapping-page";
import { MpcProjectPage } from "@/components/pages/mpc-project-page";
import { BUSINESS_DEVELOPMENT_PAGE } from "@/lib/service-pages/business-development";
import { CANDIDATE_SOURCING_PAGE } from "@/lib/service-pages/candidate-sourcing";
import { FULL_CYCLE_RECRUITMENT_PAGE } from "@/lib/service-pages/full-cycle-recruitment";
import { MARKET_MAPPING_PAGE } from "@/lib/service-pages/market-mapping";
import { MPC_PROJECT_PAGE } from "@/lib/service-pages/mpc-project";
import { SERVICES, SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "full-half-cycle-recruitment") {
    return {
      title: FULL_CYCLE_RECRUITMENT_PAGE.title,
      description: FULL_CYCLE_RECRUITMENT_PAGE.intro,
    };
  }
  if (slug === "candidate-sourcing") {
    return {
      title: CANDIDATE_SOURCING_PAGE.title,
      description: CANDIDATE_SOURCING_PAGE.intro,
    };
  }
  if (slug === "business-development") {
    return {
      title: BUSINESS_DEVELOPMENT_PAGE.title,
      description: BUSINESS_DEVELOPMENT_PAGE.intro,
    };
  }
  if (slug === "mpc-project") {
    return {
      title: MPC_PROJECT_PAGE.title,
      description: MPC_PROJECT_PAGE.intro,
    };
  }
  if (slug === "market-mapping") {
    return {
      title: MARKET_MAPPING_PAGE.title,
      description: MARKET_MAPPING_PAGE.intro,
    };
  }
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "full-half-cycle-recruitment") {
    return <FullCycleRecruitmentPage />;
  }
  if (slug === "candidate-sourcing") {
    return <CandidateSourcingPage />;
  }
  if (slug === "business-development") {
    return <BusinessDevelopmentPage />;
  }
  if (slug === "mpc-project") {
    return <MpcProjectPage />;
  }
  if (slug === "market-mapping") {
    return <MarketMappingPage />;
  }

  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  return (
    <ContentPage
      label="Services"
      title={service.title}
      description={service.description}
      body={`${SITE.name} delivers ${service.title.toLowerCase()} with a focus on quality, speed, and measurable hiring outcomes. Our consultants combine industry expertise with proven processes to help you build teams that drive growth.`}
      backHref="/services"
      backLabel="All services"
    />
  );
}
