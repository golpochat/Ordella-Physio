"use client";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/marketing/CtaLink";
import {
  marketingButtonPrimaryClass,
  marketingButtonSecondaryClass,
} from "@/lib/marketing-ui";
import type { BillingCycle, PlanId } from "@/lib/pricing-plans";
import { buildCheckoutHref } from "@/lib/pricing-plans";

export type PricingCardCtaProps = {
  planId: PlanId;
  billingCycle: BillingCycle;
  popular?: boolean;
  isEnterprise?: boolean;
};

export function PricingCardCta({
  planId,
  billingCycle,
  popular = false,
  isEnterprise = false,
}: PricingCardCtaProps) {
  const primaryClass = cn(marketingButtonPrimaryClass, "w-full");
  const secondaryClass = cn(marketingButtonSecondaryClass, "w-full");

  if (isEnterprise) {
    return (
      <Button asChild className={secondaryClass} variant="outline">
        <CtaLink href="/contact" location="pricing_card" label="Enterprise - Contact sales">
          Contact sales
        </CtaLink>
      </Button>
    );
  }

  const trialHref = buildCheckoutHref(planId, billingCycle, "trial");
  const checkoutHref = buildCheckoutHref(planId, billingCycle, "checkout");

  return (
    <div className="flex flex-col gap-3">
      <Button asChild className={popular ? primaryClass : secondaryClass} variant={popular ? "primary" : "outline"}>
        <CtaLink href={trialHref} location="pricing_card" label={`${planId} - Start free trial`}>
          Start Free Trial
        </CtaLink>
      </Button>
      <Button asChild className={secondaryClass} variant="outline">
        <CtaLink href={checkoutHref} location="pricing_card" label={`${planId} - Continue to checkout`}>
          Continue to Checkout
        </CtaLink>
      </Button>
    </div>
  );
}
