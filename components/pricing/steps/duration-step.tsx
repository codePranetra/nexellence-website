"use client";

import {
  LONG_TERM_DEFAULT_MONTHS,
  LONG_TERM_MONTHLY_DISCOUNT,
  type DurationType,
} from "@/lib/pricing/config";
import { SelectCard } from "@/components/pricing/select-card";
import { cn } from "@/lib/utils";

type DurationStepProps = {
  durationType?: DurationType;
  months: number;
  onDurationTypeChange: (type: DurationType) => void;
  onMonthsChange: (months: number) => void;
};

export function DurationStep({
  durationType,
  months,
  onDurationTypeChange,
  onMonthsChange,
}: DurationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Project Duration</h2>
        <p className="mt-2 text-muted-foreground">
          How long do you need this virtual talent support?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectCard
          label="Months (1-6)"
          selected={durationType === "short"}
          onClick={() => {
            onDurationTypeChange("short");
            if (months > 6 || months < 1) onMonthsChange(1);
          }}
        />
        <SelectCard
          label="More than 6 months"
          description={`Commit more than 6 months and save $${LONG_TERM_MONTHLY_DISCOUNT} per month.`}
          selected={durationType === "long"}
          onClick={() => {
            onDurationTypeChange("long");
            if (months <= 6) onMonthsChange(LONG_TERM_DEFAULT_MONTHS);
          }}
        />
      </div>

      {durationType === "short" && (
        <div>
          <label htmlFor="months-select" className="text-sm font-medium">
            Number of months
          </label>
          <select
            id="months-select"
            value={months}
            onChange={(e) => onMonthsChange(Number(e.target.value))}
            className={cn(
              "mt-2 w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none",
              "focus:border-brand-electric focus:shadow-[0_0_20px_rgba(0,180,255,0.2)]"
            )}
          >
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <option key={m} value={m}>
                {m} {m === 1 ? "month" : "months"}
              </option>
            ))}
          </select>
        </div>
      )}

      {durationType === "long" && (
        <div>
          <label htmlFor="long-months" className="text-sm font-medium">
            Number of months (7+)
          </label>
          <input
            id="long-months"
            type="number"
            min={7}
            max={120}
            value={months}
            onChange={(e) => onMonthsChange(Math.max(7, Number(e.target.value)))}
            className="mt-2 w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-brand-electric"
          />
        </div>
      )}
    </div>
  );
}
