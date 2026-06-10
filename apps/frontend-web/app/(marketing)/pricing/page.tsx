import type { Metadata } from "next";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { ComparisonTable } from "@/components/marketing/pricing/comparison-table";
import { PricingPlansSection } from "@/components/marketing/pricing/pricing-plans-section";
import { PRICING_COMPARISON_FEATURES } from "@/lib/marketing-content";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PRICING_FAQ_ITEMS } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Ordella Physio Pricing",
  description: "Transparent pricing for clinics, therapists, and healthcare teams.",
};

export default function PricingPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="Pricing"
            title="Plans that scale with your clinic"
            description="All plans include a 14-day free trial. No credit card required."
          />
          <div className="mt-12">
            <PricingPlansSection showToggle showComparison={false} />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            title="Feature comparison"
            description="See what's included in each plan."
          />
          <div className="mt-12">
            <ComparisonTable rows={PRICING_COMPARISON_FEATURES} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            centered
            eyebrow="FAQ"
            title="Pricing questions"
            description="Common questions about plans, billing, and upgrades."
          />
          <div className="mt-12">
            <FaqAccordion items={PRICING_FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <CtaSection
        title="Not sure which plan is right?"
        description="Our team can help you find the best fit for your clinic size and workflow."
      />
    </>
  );
}
