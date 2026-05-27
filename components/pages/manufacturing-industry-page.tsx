"use client";

import { IndustryRecruitmentPage } from "@/components/pages/industry-recruitment-page";
import { MANUFACTURING_PAGE } from "@/lib/industry-pages/manufacturing";

export function ManufacturingIndustryPage() {
  return <IndustryRecruitmentPage page={MANUFACTURING_PAGE} />;
}
