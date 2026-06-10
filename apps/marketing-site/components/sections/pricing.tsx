"use client";

import { useState } from "react";
import Link from "next/link";
import { PricingCard } from "@/components/cards/pricing-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRICING_TIERS } from "@/lib/content";

type BillingPeriod = "monthly" | "yearly";

export function PricingSection({
  showAllLink = true,
  className,
}: {
  showAllLink?: boolean;
  className?: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <Section id="pricing" className={className}>
      <SectionHeader
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="Choose the plan that fits your clinic. Upgrade anytime."
      />
      <div className="mb-10 flex justify-center">
        <Tabs value={period} onValueChange={(value) => setPeriod(value as BillingPeriod)}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly (save 20%)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <PricingCard
            key={tier.id}
            name={tier.name}
            price={period === "monthly" ? tier.monthlyPrice : Math.round(tier.yearlyPrice / 12)}
            period={period === "monthly" ? "mo" : "mo (billed yearly)"}
            description={tier.description}
            features={tier.features}
            highlighted={tier.highlighted}
          />
        ))}
      </div>
      {showAllLink ? (
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/pricing">View full feature comparison →</Link>
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
