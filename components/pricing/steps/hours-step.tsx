"use client";

import { WEEKLY_HOURS_OPTIONS, type WeeklyHours } from "@/lib/pricing/config";
import { SelectCard } from "@/components/pricing/select-card";

type HoursStepProps = {
  selected?: WeeklyHours;
  onChange: (hours: WeeklyHours) => void;
};

export function HoursStep({ selected, onChange }: HoursStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">
          Work Hours Needed per Week
        </h2>
        <p className="mt-2 text-muted-foreground">
          How many hours per week do you need from your virtual talent?
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {WEEKLY_HOURS_OPTIONS.map((option) => (
          <SelectCard
            key={option.value}
            label={option.label}
            selected={selected === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
