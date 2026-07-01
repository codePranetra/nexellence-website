"use client";

import { SKILL_LEVEL_OPTIONS, type SkillLevel } from "@/lib/pricing/config";
import { SelectCard } from "@/components/pricing/select-card";

type SkillStepProps = {
  selected?: SkillLevel;
  onChange: (skill: SkillLevel) => void;
};

export function SkillStep({ selected, onChange }: SkillStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Skill Set Required</h2>
        <p className="mt-2 text-muted-foreground">
          What experience level do you need for this role?
        </p>
      </div>
      <div className="grid gap-3">
        {SKILL_LEVEL_OPTIONS.map((option) => (
          <SelectCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={selected === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
