"use client";

import { useEffect, useState } from "react";
import { PricingCard } from "@/components/marketing/PricingCard";
import { PricingComparison } from "@/components/marketing/PricingComparison";
import { PricingFAQ } from "@/components/marketing/PricingFAQ";
import { PricingToggle, usePricingPeriod } from "@/components/marketing/PricingToggle";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { PRICING_PLANS, type PlanId } from "@/lib/pricing-plans";
import { authClient } from "@/lib/auth-client";

const PLAN_ORDER: PlanId[] = ["starter", "pro", "enterprise"];

export function PricingPageContent() {
  const { yearly, billingCycle, setYearly } = usePricingPeriod(true);
  const [trialDays, setTrialDays] = useState<number | null>(null);

  useEffect(() => {
    void authClient
      .getOnboardingConfig()
      .then((config) => setTrialDays(config.trialDurationDays))
      .catch(() => setTrialDays(14));
  }, []);

  return (
    <div className="bg-background pb-2xl pt-2xl max-sm:pb-xl max-sm:pt-xl">
      <MarketingPageHero
        title="Pricing that grows with your clinic."
        description="Transparent Euro pricing. Choose a free trial or go straight to checkout. No setup fees. Cancel anytime."
      />

      <div className="marketing-container">
        <PricingToggle yearly={yearly} onChange={setYearly} />

        <section className="pricing-cards grid grid-cols-1 gap-lg md:grid-cols-3 md:items-stretch">
          {PLAN_ORDER.map((planId) => {
            const plan = PRICING_PLANS[planId];
            return (
              <PricingCard
                key={planId}
                planId={planId}
                name={plan.name}
                description={plan.description}
                billingCycle={billingCycle}
                features={plan.features}
                popular={plan.highlighted}
                trialDays={trialDays ?? undefined}
                isEnterprise={planId === "enterprise"}
              />
            );
          })}
        </section>
      </div>

      <PricingComparison />
      <PricingFAQ />
    </div>
  );
}
