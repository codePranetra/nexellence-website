export type ServiceId =
  | "candidate-sourcing"
  | "contact-details"
  | "outreach"
  | "crm-ats"
  | "pre-screening"
  | "business-development";

export type WeeklyHours = 20 | 30 | 40;
export type SkillLevel = "fresher" | "intermediate" | "expert";
export type DurationType = "short" | "long";

export const PRICING_SERVICES: {
  id: ServiceId;
  label: string;
  monthlyPrice: number;
}[] = [
  { id: "candidate-sourcing", label: "Candidate Sourcing", monthlyPrice: 200 },
  { id: "contact-details", label: "Contact Details Searching", monthlyPrice: 150 },
  { id: "outreach", label: "Outreach-Email/LinkedIn/Phone", monthlyPrice: 200 },
  { id: "crm-ats", label: "CRM/ATS Management", monthlyPrice: 250 },
  { id: "pre-screening", label: "Pre-screening Interviews", monthlyPrice: 300 },
  { id: "business-development", label: "Business Development and MPC", monthlyPrice: 350 },
];

export const WEEKLY_HOURS_OPTIONS: { value: WeeklyHours; label: string }[] = [
  { value: 20, label: "20 Hours" },
  { value: 30, label: "30 Hours" },
  { value: 40, label: "40 Hours" },
];

export const SKILL_LEVEL_OPTIONS: {
  value: SkillLevel;
  label: string;
  description: string;
}[] = [
  { value: "fresher", label: "Fresher", description: "I will train them." },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Has good understanding",
  },
  {
    value: "expert",
    label: "Expert",
    description: "Done everything for more than 3 years.",
  },
];

/** Monthly base rate in USD by hours × skill level */
export const BASE_RATE: Record<WeeklyHours, Record<SkillLevel, number>> = {
  20: { fresher: 800, intermediate: 1000, expert: 1200 },
  30: { fresher: 1100, intermediate: 1400, expert: 1700 },
  40: { fresher: 1400, intermediate: 1800, expert: 2200 },
};

/** Discount per month when committing more than 6 months (USD) */
export const LONG_TERM_MONTHLY_DISCOUNT = 100;

/** Default month count when "more than 6 months" is selected */
export const LONG_TERM_DEFAULT_MONTHS = 7;

export const WIZARD_STEPS = [
  { id: 1, title: "Let's Begin" },
  { id: 2, title: "Services Required" },
  { id: 3, title: "Work Hours Needed per Week" },
  { id: 4, title: "Project Duration" },
  { id: 5, title: "Skill Set Required" },
  { id: 6, title: "Final cost" },
] as const;

export const SESSION_STORAGE_KEY = "taas-inquiry";
