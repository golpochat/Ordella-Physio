"use client";

import Link from "next/link";
import { cn } from "@ordella/shared-ui";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureList } from "@/components/marketing/pricing/feature-list";
import type { BillingPeriod, PricingTier } from "@/lib/marketing-content";
import { getTierPeriodLabel, getTierPrice } from "@/lib/marketing-content";

export type PricingCardProps = {
  tier: PricingTier;
  period: BillingPeriod;
};

export function PricingCard({ tier, period }: PricingCardProps) {
  const price = getTierPrice(tier, period);
  const isCustom = price === "Custom";
  const periodLabel = isCustom ? "" : getTierPeriodLabel(period);

  return (
    <Card
      className={cn(
        "flex flex-col",
        tier.highlighted && "border-primary shadow-md ring-1 ring-primary lg:scale-105",
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{tier.name}</CardTitle>
          {tier.recommended ? <Badge>Recommended</Badge> : null}
        </div>
        <CardDescription>{tier.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          {periodLabel ? <span className="text-muted-foreground">{periodLabel}</span> : null}
        </div>
        {period === "yearly" && tier.yearlySavingsLabel && !isCustom ? (
          <p className="mt-2 text-xs font-medium text-primary">{tier.yearlySavingsLabel}</p>
        ) : null}
      </CardHeader>
      <CardBody className="mt-auto space-y-6">
        <FeatureList features={tier.features} />
        <Button asChild className="w-full" variant={tier.recommended ? "primary" : "outline"}>
          <Link href={tier.ctaHref}>{tier.cta}</Link>
        </Button>
      </CardBody>
    </Card>
  );
}
