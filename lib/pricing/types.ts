import type { DurationType, ServiceId, SkillLevel, WeeklyHours } from "./config";

export type PricingFormState = {
  inquiryId?: number;
  email: string;
  services: ServiceId[];
  weeklyHours?: WeeklyHours;
  durationType?: DurationType;
  months: number;
  skillLevel?: SkillLevel;
  message?: string;
  wizardStep?: number;
};

export const INITIAL_FORM_STATE: PricingFormState = {
  email: "",
  services: [],
  months: 1,
  message: "",
};
