import Link from "next/link";
import { Button } from "@/components/ui/button";

export type CtaSectionProps = {
  title?: string;
  description?: string;
  showPricingLink?: boolean;
};

export function CtaSection({
  title = "Ready to transform your practice?",
  description = "Join clinics already using Ordella Physio to deliver better patient care with less admin overhead.",
  showPricingLink = false,
}: CtaSectionProps) {
  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/register">Get Started</Link>
          </Button>
          {showPricingLink ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          ) : null}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/contact">Talk to sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
