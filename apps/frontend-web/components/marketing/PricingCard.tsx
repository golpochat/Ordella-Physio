import { cn } from "@/lib/cn";
import { PricingCardCta } from "@/components/marketing/PricingCardCta";
import { marketingCardClass, marketingHeading } from "@/lib/marketing-ui";

export type PricingCardProps = {
  title: string;
  price: number;
  features: string[];
  popular?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  ctaExperimentId?: string;
};

export function PricingCard({
  title,
  price,
  features,
  popular = false,
  ctaHref = "/contact",
  ctaLabel = "Get Started",
  ctaExperimentId,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        marketingCardClass,
        "fade-in",
        popular && "border-2 border-brand-primary lg:scale-105",
      )}
    >
      {popular ? (
        <div className="mb-md inline-block rounded-sm bg-brand-primary px-sm py-xs text-sm text-white">
          Most Popular
        </div>
      ) : null}

      <h3 className={cn("mb-sm", marketingHeading.h3)}>{title}</h3>

      <p className="mb-md font-display text-4xl font-bold leading-tight text-foreground">
        €{price}
        <span className={`text-base font-normal ${marketingHeading.body}`}> /mo</span>
      </p>

      <ul className="mb-lg space-y-sm">
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
        title={title}
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
        popular={popular}
        experimentId={ctaExperimentId}
      />
    </div>
  );
}
