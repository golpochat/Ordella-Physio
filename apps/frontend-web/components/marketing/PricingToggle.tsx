"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type PricingToggleProps = {
  onChange: (yearly: boolean) => void;
};

export function PricingToggle({ onChange }: PricingToggleProps) {
  const [yearly, setYearly] = useState(false);

  const handleToggle = () => {
    const next = !yearly;
    setYearly(next);
    onChange(next);
  };

  return (
    <div className="mb-xl flex items-center justify-center gap-md">
      <span className={cn("text-sm", !yearly ? "font-semibold text-foreground" : "text-brand-gray")}>
        Monthly
      </span>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={yearly ? "Switch to monthly billing" : "Switch to yearly billing"}
        aria-pressed={yearly}
        className="ripple cursor-pointer relative h-8 w-16 rounded-full bg-brand-light transition-all"
      >
        <div
          className={cn(
            "absolute top-1 h-6 w-6 rounded-full bg-brand-primary transition-all",
            yearly ? "left-9" : "left-1",
          )}
        />
      </button>

      <span className={cn("text-sm", yearly ? "font-semibold text-foreground" : "text-brand-gray")}>
        Yearly
      </span>
    </div>
  );
}
