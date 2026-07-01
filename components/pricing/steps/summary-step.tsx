"use client";

import { formatUsd } from "@/lib/pricing/calculate";
import type { PricingResult } from "@/lib/pricing/calculate";
import { SummaryTable } from "@/components/pricing/summary-table";

type SummaryStepProps = {
  email: string;
  message: string;
  onMessageChange: (message: string) => void;
  pricing: PricingResult | null;
  error?: string;
  submitting?: boolean;
};

export function SummaryStep({
  email,
  message,
  onMessageChange,
  pricing,
  error,
  submitting,
}: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Final cost</h2>
        <p className="mt-2 text-muted-foreground">
          The final estimated price is:
          {pricing && (
            <span className="ml-2 text-2xl font-bold text-brand-electric">
              {formatUsd(pricing.total)}
            </span>
          )}
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground">
          Your email
        </label>
        <p className="mt-1 font-medium">{email}</p>
      </div>

      <div>
        <label htmlFor="pricing-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="pricing-message"
          rows={4}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Any additional details about your project..."
          className="mt-2 w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition focus:border-brand-electric focus:shadow-[0_0_20px_rgba(0,180,255,0.2)]"
        />
      </div>

      {pricing && (
        <div>
          <h3 className="mb-3 font-semibold">Summary</h3>
          <SummaryTable
            lineItems={pricing.lineItems}
            discount={pricing.discount}
            total={pricing.total}
          />
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
      {submitting && (
        <p className="text-sm text-muted-foreground">Submitting your inquiry...</p>
      )}
    </div>
  );
}
