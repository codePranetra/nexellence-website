export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export type NavChild = { label: string; href: string };

export type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href: string; children: NavChild[] };

export const ABOUT_NAV: NavChild[] = [
  { label: "Career", href: "/about/career" },
  { label: "Life Beyond Work", href: "/about/life-beyond-work" },
  { label: "Jobs", href: "/about/jobs" },
];

export const SERVICES_NAV: NavChild[] = [
  { label: "Full Cycle Recruitment", href: "/services/full-half-cycle-recruitment" },
  { label: "Candidate Sourcing", href: "/services/candidate-sourcing" },
  { label: "Business Development", href: "/services/business-development" },
  { label: "CRM & Database Management", href: "/services/ats-and-database-management" },
  { label: "MPC Project", href: "/services/mpc-project" },
  { label: "Market Mapping and Other", href: "/services/market-mapping" },
];

export const INDUSTRIES_NAV: NavChild[] = [
  { label: "Construction", href: "/industries/construction" },
  { label: "Pharmaceutical", href: "/industries/pharmaceutical" },
  { label: "Supply Chain", href: "/industries/supply-chain" },
  { label: "IT & IoT", href: "/industries/it-and-iot" },
  { label: "Legal & Finance", href: "/industries/legal-and-finance" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Food & Beverages", href: "/industries/food-and-beverages" },
];

export const MAIN_NAV: NavItem[] = [
  { label: "About Us", href: "/about", children: ABOUT_NAV },
  { label: "Services", href: "/services", children: SERVICES_NAV },
  { label: "Industries", href: "/industries", children: INDUSTRIES_NAV },
  { label: "Custom Pricing", href: "/build-your-custom-pricing" },
  { label: "Blog", href: "/blog" },
];
