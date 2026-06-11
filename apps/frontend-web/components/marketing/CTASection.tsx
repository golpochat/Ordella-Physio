import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/marketing/CtaLink";
import { Section } from "@/components/marketing/Section";
import { marketingButtonPrimaryClass, marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";

export type CTASectionProps = {
  title?: string;
  description?: string;
  showPricingLink?: boolean;
};

const ctaOutlineClass = cn(
  "btn-lift ripple rounded-md border border-primary-foreground/30 px-xl py-md font-semibold shadow-soft",
  "bg-transparent text-primary-foreground hover:bg-primary-foreground/10",
);

export function CTASection({
  title = "Ready to transform your practice?",
  description = "Join clinics already using Ordella Physio to deliver better patient care with less admin overhead.",
  showPricingLink = false,
}: CTASectionProps) {
  return (
    <Section variant="brand">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={cn(marketingHeading.h2, "text-primary-foreground")}>{title}</h2>
        <p className="mx-auto mt-md max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
          {description}
        </p>
        <div className="mt-xl flex flex-col items-center justify-center gap-md sm:flex-row">
          <Button
            asChild
            size="lg"
            className={cn(
              marketingButtonPrimaryClass,
              "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
            )}
          >
            <CtaLink href="/register" location="cta_section" label="Get started">
              Get Started
            </CtaLink>
          </Button>
          {showPricingLink ? (
            <Button asChild size="lg" variant="outline" className={ctaOutlineClass}>
              <CtaLink href="/pricing" location="cta_section" label="View pricing">
                View Pricing
              </CtaLink>
            </Button>
          ) : null}
          <Button asChild size="lg" variant="outline" className={ctaOutlineClass}>
            <CtaLink href="/contact" location="cta_section" label="Talk to sales">
              Talk to sales
            </CtaLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
