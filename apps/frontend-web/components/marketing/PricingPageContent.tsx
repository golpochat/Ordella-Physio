"use client";

import { useState } from "react";
import { PricingCard } from "@/components/marketing/PricingCard";
import { PricingComparison } from "@/components/marketing/PricingComparison";
import { PricingFAQ } from "@/components/marketing/PricingFAQ";
import { PricingToggle } from "@/components/marketing/PricingToggle";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export function PricingPageContent() {
  const [yearly, setYearly] = useState(false);

  const prices = {
    starter: yearly ? 19 : 24,
    pro: yearly ? 39 : 49,
    enterprise: yearly ? 79 : 99,
  };

  return (
    <div className="bg-background pb-2xl pt-2xl">
      <MarketingPageHero
        title="Simple, transparent pricing"
        description="Choose the plan that fits your clinic. No hidden fees. No contracts. All prices in Euro (€)."
      />

      <div className="marketing-container">
        <PricingToggle onChange={setYearly} />

        <section className="grid grid-cols-1 gap-lg md:grid-cols-3 md:items-center">
          <PricingCard
            title="Starter"
            price={prices.starter}
            features={["Appointments", "Patient Records", "Clinical Notes"]}
          />

          <PricingCard
            title="Pro"
            price={prices.pro}
            popular
            ctaExperimentId="pricing_pro_cta"
            features={[
              "Everything in Starter",
              "Billing & Invoicing",
              "Analytics",
              "Messaging",
            ]}
          />

          <PricingCard
            title="Enterprise"
            price={prices.enterprise}
            features={[
              "Everything in Pro",
              "Multi-location",
              "Advanced Permissions",
              "Priority Support",
            ]}
          />
        </section>
      </div>

      <PricingComparison />
      <PricingFAQ />
    </div>
  );
}
