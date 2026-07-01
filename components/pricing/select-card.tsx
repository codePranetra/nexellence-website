"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type SelectCardProps = {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
};

export function SelectCard({
  label,
  description,
  selected,
  onClick,
  multi = false,
}: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full rounded-2xl border p-5 text-left transition-all",
        "glass glow-border hover:border-brand-electric/50",
        selected
          ? "border-brand-electric bg-brand-electric/10 shadow-[0_0_20px_rgba(0,180,255,0.15)]"
          : "border-border"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{label}</p>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition",
            selected
              ? "border-brand-electric bg-brand-electric text-black"
              : "border-border",
            multi ? "rounded-md" : "rounded-full"
          )}
        >
          {selected && <Check className="h-3.5 w-3.5" />}
        </div>
      </div>
    </button>
  );
}
