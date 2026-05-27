import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConstructionIndustryPage } from "@/components/pages/construction-industry-page";
import { FoodAndBeveragesIndustryPage } from "@/components/pages/food-and-beverages-industry-page";
import { ItAndIotIndustryPage } from "@/components/pages/it-and-iot-industry-page";
import { LegalAndFinanceIndustryPage } from "@/components/pages/legal-and-finance-industry-page";
import { ManufacturingIndustryPage } from "@/components/pages/manufacturing-industry-page";
import { PharmaceuticalIndustryPage } from "@/components/pages/pharmaceutical-industry-page";
import { SupplyChainIndustryPage } from "@/components/pages/supply-chain-industry-page";
import { ContentPage } from "@/components/pages/content-page";
import { INDUSTRIES, SITE } from "@/lib/constants";
import { CONSTRUCTION_PAGE } from "@/lib/industry-pages/construction";
import { FOOD_AND_BEVERAGES_PAGE } from "@/lib/industry-pages/food-and-beverages";
import { IT_AND_IOT_PAGE } from "@/lib/industry-pages/it-and-iot";
import { LEGAL_AND_FINANCE_PAGE } from "@/lib/industry-pages/legal-and-finance";
import { MANUFACTURING_PAGE } from "@/lib/industry-pages/manufacturing";
import { PHARMACEUTICAL_PAGE } from "@/lib/industry-pages/pharmaceutical";
import { SUPPLY_CHAIN_PAGE } from "@/lib/industry-pages/supply-chain";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    construction: { title: CONSTRUCTION_PAGE.title, description: CONSTRUCTION_PAGE.intro },
    pharmaceutical: {
      title: PHARMACEUTICAL_PAGE.title,
      description: PHARMACEUTICAL_PAGE.intro,
    },
    "supply-chain": { title: SUPPLY_CHAIN_PAGE.title, description: SUPPLY_CHAIN_PAGE.intro },
    "it-and-iot": { title: IT_AND_IOT_PAGE.title, description: IT_AND_IOT_PAGE.intro },
    "legal-and-finance": {
      title: LEGAL_AND_FINANCE_PAGE.title,
      description: LEGAL_AND_FINANCE_PAGE.intro,
    },
    manufacturing: { title: MANUFACTURING_PAGE.title, description: MANUFACTURING_PAGE.intro },
    "food-and-beverages": {
      title: FOOD_AND_BEVERAGES_PAGE.title,
      description: FOOD_AND_BEVERAGES_PAGE.intro,
    },
  };
  if (meta[slug]) return meta[slug];
  const industry = INDUSTRIES.find((i) => i.id === slug);
  if (!industry) return { title: "Industry" };
  return { title: industry.title, description: industry.description };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;

  switch (slug) {
    case "construction":
      return <ConstructionIndustryPage />;
    case "pharmaceutical":
      return <PharmaceuticalIndustryPage />;
    case "supply-chain":
      return <SupplyChainIndustryPage />;
    case "it-and-iot":
      return <ItAndIotIndustryPage />;
    case "legal-and-finance":
      return <LegalAndFinanceIndustryPage />;
    case "manufacturing":
      return <ManufacturingIndustryPage />;
    case "food-and-beverages":
      return <FoodAndBeveragesIndustryPage />;
    default:
      break;
  }

  const industry = INDUSTRIES.find((i) => i.id === slug);
  if (!industry) notFound();

  return (
    <ContentPage
      label="Industries"
      title={industry.title}
      description={industry.description}
      body={`${SITE.name} brings deep recruitment expertise to the ${industry.title.toLowerCase()} sector — connecting organizations with professionals who understand your market, regulations, and operational demands.`}
      backHref="/industries"
      backLabel="All industries"
    />
  );
}
