"use client";

import { cn } from "@ordella/shared-ui";
import type { BillingPeriod } from "@/lib/marketing-content";

export type BillingToggleProps = {
  period: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
};

export function BillingToggle({ period, onChange }: BillingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <div
        className="inline-flex rounded-lg border bg-muted/50 p-1"
        role="group"
        aria-label="Billing period"
      >
        <button
          type="button"
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium transition-colors",
            period === "monthly"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => onChange("monthly")}
          aria-pressed={period === "monthly"}
        >
          Monthly
        </button>
        <button
          type="button"
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium transition-colors",
            period === "yearly"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => onChange("yearly")}
          aria-pressed={period === "yearly"}
        >
          Yearly
        </button>
      </div>
      <span className="text-sm font-medium text-primary">Save 20% with yearly billing</span>
    </div>
  );
}
