"use client";

import { useState } from "react";
import { BillingToggle } from "@/components/marketing/pricing/billing-toggle";
import { ComparisonTable } from "@/components/marketing/pricing/comparison-table";
import { PricingCard } from "@/components/marketing/pricing/pricing-card";
import type { BillingPeriod } from "@/lib/marketing-content";
import { PRICING_COMPARISON_FEATURES, PRICING_TIERS } from "@/lib/marketing-content";

export type PricingPlansSectionProps = {
  showToggle?: boolean;
  showCards?: boolean;
  showComparison?: boolean;
};

export function PricingPlansSection({
  showToggle = true,
  showCards = true,
  showComparison = false,
}: PricingPlansSectionProps) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <div className="space-y-12">
      {showToggle ? (
        <div className="flex justify-center">
          <BillingToggle period={period} onChange={setPeriod} />
        </div>
      ) : null}

      {showCards ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-center">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} period={showToggle ? period : "monthly"} />
          ))}
        </div>
      ) : null}

      {showComparison ? <ComparisonTable rows={PRICING_COMPARISON_FEATURES} /> : null}
    </div>
  );
}
