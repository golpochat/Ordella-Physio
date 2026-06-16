import { cn } from "@/lib/cn";
import { PricingCardCta } from "@/components/marketing/PricingCardCta";
import { marketingCardClass, marketingHeading } from "@/lib/marketing-ui";
import type { BillingCycle, PlanId } from "@/lib/pricing-plans";
import { formatEuro, getPlanDisplayPrice } from "@/lib/pricing-plans";

export type PricingCardProps = {
  planId: PlanId;
  name: string;
  description: string;
  billingCycle: BillingCycle;
  features: string[];
  popular?: boolean;
  trialDays?: number;
  isEnterprise?: boolean;
};

export function PricingCard({
  planId,
  name,
  description,
  billingCycle,
  features,
  popular = false,
  trialDays,
  isEnterprise = false,
}: PricingCardProps) {
  const displayPrice = getPlanDisplayPrice(planId, billingCycle);

  return (
    <div
      className={cn(
        marketingCardClass,
        "fade-in flex h-full flex-col",
        popular && "border-2 border-brand-primary max-lg:scale-100 lg:scale-105",
        "max-sm:p-xl",
      )}
    >
      {popular ? (
        <div className="mb-md inline-block rounded-sm bg-brand-primary px-sm py-xs text-sm text-white">
          Most Popular
        </div>
      ) : null}

      {!isEnterprise && trialDays ? (
        <div className="mb-sm inline-block rounded-sm bg-emerald-100 px-sm py-xs text-xs font-semibold text-emerald-800">
          {trialDays}-day free trial
        </div>
      ) : null}

      <h3 className={cn("mb-sm", marketingHeading.h3)}>{name}</h3>
      <p className={cn("mb-md text-sm", marketingHeading.body)}>{description}</p>

      <p className="mb-md font-display text-4xl font-bold leading-tight text-foreground">
        {displayPrice === null ? (
          "Custom"
        ) : (
          <>
            {formatEuro(displayPrice)}
            <span className={`text-base font-normal ${marketingHeading.body}`}>
              {billingCycle === "yearly" ? " /mo, billed yearly" : " /mo"}
            </span>
          </>
        )}
      </p>

      <ul className="mb-lg flex-1 space-y-sm max-sm:space-y-xs">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-sm">
            <span className="text-brand-primary" aria-hidden>
              ✔
            </span>
            <span className={marketingHeading.body}>{feature}</span>
          </li>
        ))}
      </ul>

      <PricingCardCta
        planId={planId}
        billingCycle={billingCycle}
        popular={popular}
        isEnterprise={isEnterprise}
      />
    </div>
  );
}
