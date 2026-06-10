import Link from "next/link";
import { PricingCard } from "@/components/cards/pricing-card";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/lib/content";

export function PricingPreviewSection() {
  const previewTiers = pricingTiers.slice(0, 3);

  return (
    <Section>
      <SectionHeader
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="Choose the plan that fits your clinic. Upgrade anytime."
      />
      <div className="grid gap-8 lg:grid-cols-3">
        {previewTiers.map((tier) => (
          <PricingCard key={tier.id} {...tier} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="outline">
          <Link href="/pricing">View all plans including Enterprise →</Link>
        </Button>
      </div>
    </Section>
  );
}
