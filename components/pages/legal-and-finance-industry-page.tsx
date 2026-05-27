"use client";

import { IndustryRecruitmentPage } from "@/components/pages/industry-recruitment-page";
import { LEGAL_AND_FINANCE_PAGE } from "@/lib/industry-pages/legal-and-finance";

export function LegalAndFinanceIndustryPage() {
  return <IndustryRecruitmentPage page={LEGAL_AND_FINANCE_PAGE} />;
}
