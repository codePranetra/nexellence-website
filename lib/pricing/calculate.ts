import {
  BASE_RATE,
  LONG_TERM_MONTHLY_DISCOUNT,
  PRICING_SERVICES,
  type DurationType,
  type ServiceId,
  type SkillLevel,
  type WeeklyHours,
} from "./config";

export type PricingLineItem = {
  description: string;
  information: string;
  quantity: number;
  price: number;
};

export type PricingInput = {
  services: ServiceId[];
  weeklyHours: WeeklyHours;
  durationType: DurationType;
  months: number;
  skillLevel: SkillLevel;
};

export type PricingResult = {
  lineItems: PricingLineItem[];
  discount: number;
  subtotal: number;
  total: number;
  totalCents: number;
  discountCents: number;
};

export function calculatePricing(input: PricingInput): PricingResult {
  const { services, weeklyHours, durationType, months, skillLevel } = input;

  const monthlyBase = BASE_RATE[weeklyHours][skillLevel];
  const lineItems: PricingLineItem[] = [
    {
      description: "Base rate",
      information: `${weeklyHours} hrs/week · ${skillLevel}`,
      quantity: months,
      price: monthlyBase * months,
    },
  ];

  for (const serviceId of services) {
    const service = PRICING_SERVICES.find((s) => s.id === serviceId);
    if (service) {
      lineItems.push({
        description: service.label,
        information: "Monthly add-on",
        quantity: months,
        price: service.monthlyPrice * months,
      });
    }
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.price, 0);
  const discount =
    durationType === "long" ? LONG_TERM_MONTHLY_DISCOUNT * months : 0;
  const total = Math.max(0, subtotal - discount);

  return {
    lineItems,
    discount,
    subtotal,
    total,
    totalCents: Math.round(total * 100),
    discountCents: Math.round(discount * 100),
  };
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
