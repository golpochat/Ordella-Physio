"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { getMaxYearlySavingsPercent } from "@/lib/pricing-plans";

export type PricingToggleProps = {
  yearly: boolean;
  onChange: (yearly: boolean) => void;
};

export function PricingToggle({ yearly, onChange }: PricingToggleProps) {
  const savingsPercent = getMaxYearlySavingsPercent();

  const optionClass = (active: boolean) =>
    cn(
      "min-w-[5.5rem] rounded-full px-4 py-2 text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
      active
        ? "bg-brand-primary text-white shadow-sm"
        : "text-slate-700 hover:text-brand-dark",
    );

  return (
    <div
      className="mb-xl flex flex-col items-center justify-center gap-3"
      role="group"
      aria-label="Billing period"
    >
      <div className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 p-1 shadow-sm">
        <button
          type="button"
          className={optionClass(!yearly)}
          aria-pressed={!yearly}
          onClick={() => onChange(false)}
        >
          Monthly
        </button>
        <button
          type="button"
          className={optionClass(yearly)}
          aria-pressed={yearly}
          onClick={() => onChange(true)}
        >
          Yearly
        </button>
      </div>
      {yearly && savingsPercent > 0 ? (
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Save {savingsPercent}%
        </span>
      ) : null}
    </div>
  );
}

export function usePricingPeriod(defaultYearly = true) {
  const [yearly, setYearly] = useState(defaultYearly);
  return { yearly, billingCycle: yearly ? ("yearly" as const) : ("monthly" as const), setYearly };
}
