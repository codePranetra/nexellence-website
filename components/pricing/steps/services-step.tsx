"use client";

import { PRICING_SERVICES, type ServiceId } from "@/lib/pricing/config";
import { SelectCard } from "@/components/pricing/select-card";

type ServicesStepProps = {
  selected: ServiceId[];
  onChange: (services: ServiceId[]) => void;
};

export function ServicesStep({ selected, onChange }: ServicesStepProps) {
  const toggle = (id: ServiceId) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Services Required</h2>
        <p className="mt-2 text-muted-foreground">
          Select all services you need. You can choose more than one.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PRICING_SERVICES.map((service) => (
          <SelectCard
            key={service.id}
            label={service.label}
            selected={selected.includes(service.id)}
            onClick={() => toggle(service.id)}
            multi
          />
        ))}
      </div>
    </div>
  );
}
