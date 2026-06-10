import { PricingCard } from "@/components/cards/pricing-card";
import { Section, SectionHeader } from "@/components/layout/section";
import { FinalCtaSection } from "@/components/marketing/final-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createMetadata } from "@/lib/seo";
import { faqItems, pricingTiers } from "@/lib/content";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Simple, transparent pricing for physiotherapy clinics of every size.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <Section className="pt-16">
        <SectionHeader
          eyebrow="Pricing"
          title="Plans that grow with your clinic"
          description="Start free for 14 days. No credit card required."
        />
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} {...tier} />
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader title="Frequently asked questions" centered />
        <Accordion type="single" collapsible className="mx-auto max-w-2xl">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <FinalCtaSection />
    </>
  );
}
