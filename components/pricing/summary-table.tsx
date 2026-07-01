import { calculatePricing, formatUsd } from "@/lib/pricing/calculate";
import type { PricingLineItem } from "@/lib/pricing/calculate";

type SummaryTableProps = {
  lineItems: PricingLineItem[];
  discount: number;
  total: number;
};

export function SummaryTable({ lineItems, discount, total }: SummaryTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-3 text-left font-medium">Description</th>
            <th className="px-4 py-3 text-left font-medium">Information</th>
            <th className="px-4 py-3 text-right font-medium">Quantity</th>
            <th className="px-4 py-3 text-right font-medium">Price</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="px-4 py-3">{item.description}</td>
              <td className="px-4 py-3 text-muted-foreground">{item.information}</td>
              <td className="px-4 py-3 text-right">{item.quantity}</td>
              <td className="px-4 py-3 text-right">{formatUsd(item.price)}</td>
            </tr>
          ))}
          {discount > 0 && (
            <tr className="border-b border-border/50">
              <td className="px-4 py-3 font-medium" colSpan={3}>
                Discount
              </td>
              <td className="px-4 py-3 text-right text-green-500">
                −{formatUsd(discount)}
              </td>
            </tr>
          )}
          <tr className="bg-muted/20 font-semibold">
            <td className="px-4 py-3" colSpan={3}>
              Total
            </td>
            <td className="px-4 py-3 text-right text-brand-electric">
              {formatUsd(total)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function usePricingPreview(
  services: string[],
  weeklyHours: number | undefined,
  durationType: string | undefined,
  months: number,
  skillLevel: string | undefined
) {
  if (
    services.length === 0 ||
    !weeklyHours ||
    !durationType ||
    !skillLevel
  ) {
    return null;
  }

  return calculatePricing({
    services: services as Parameters<typeof calculatePricing>[0]["services"],
    weeklyHours: weeklyHours as 20 | 30 | 40,
    durationType: durationType as "short" | "long",
    months,
    skillLevel: skillLevel as "fresher" | "intermediate" | "expert",
  });
}
