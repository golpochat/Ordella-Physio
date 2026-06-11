"use client";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/marketing/CtaLink";
import { ExperimentCta } from "@/components/marketing/ExperimentCta";
import {
  marketingButtonPrimaryClass,
  marketingButtonSecondaryClass,
} from "@/lib/marketing-ui";

export type PricingCardCtaProps = {
  title: string;
  ctaHref?: string;
  ctaLabel?: string;
  popular?: boolean;
  experimentId?: string;
};

export function PricingCardCta({
  title,
  ctaHref = "/contact",
  ctaLabel = "Get Started",
  popular = false,
  experimentId,
}: PricingCardCtaProps) {
  const primaryClass = cn(marketingButtonPrimaryClass, "w-full");
  const secondaryClass = cn(marketingButtonSecondaryClass, "w-full");

  if (experimentId) {
    return (
      <ExperimentCta
        experimentId={experimentId}
        location="pricing_card"
        className="w-full"
        variantA={{
          href: ctaHref,
          label: `${title} - Get started`,
          children: "Get Started",
          buttonClassName: popular ? primaryClass : secondaryClass,
          buttonVariant: popular ? "primary" : "outline",
        }}
        variantB={{
          href: ctaHref,
          label: `${title} - Book a demo`,
          children: "Book a Demo",
          buttonClassName: popular ? primaryClass : secondaryClass,
          buttonVariant: popular ? "primary" : "outline",
        }}
      />
    );
  }

  return (
    <Button
      asChild
      className={popular ? primaryClass : secondaryClass}
      variant={popular ? "primary" : "outline"}
    >
      <CtaLink href={ctaHref} location="pricing_card" label={`${title} - ${ctaLabel}`}>
        {ctaLabel}
      </CtaLink>
    </Button>
  );
}
