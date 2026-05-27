"use client";

import { IndustryRecruitmentPage } from "@/components/pages/industry-recruitment-page";
import { FOOD_AND_BEVERAGES_PAGE } from "@/lib/industry-pages/food-and-beverages";

export function FoodAndBeveragesIndustryPage() {
  return <IndustryRecruitmentPage page={FOOD_AND_BEVERAGES_PAGE} />;
}
