import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/marketing/CtaLink";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { cn } from "@/lib/cn";
import { marketingButtonPrimaryClass, marketingHeading } from "@/lib/marketing-ui";
import { generateSEO, pageUrl } from "../seo";

export const metadata = generateSEO({
  title: "FAQ",
  description: "Frequently asked questions about Ordella Physio.",
  url: pageUrl("/faq"),
});

const GENERAL_FAQ = [
  {
    q: "What is Ordella Physio?",
    a: "Ordella Physio is a modern, unified platform for physiotherapy clinics, combining appointments, notes, billing, communication, and analytics.",
  },
  {
    q: "Who is it for?",
    a: "It's designed for therapists, clinic owners, admin staff, and multi-location clinics.",
  },
] as const;

const PRICING_FAQ = [
  {
    q: "Do you offer monthly plans?",
    a: "Yes. All plans are available month-to-month with no long-term contracts.",
  },
  {
    q: "Can I upgrade or downgrade?",
    a: "You can change plans at any time. Upgrades take effect immediately.",
  },
  {
    q: "Do you support Euro (€)?",
    a: "Yes. Euro (€) is the base currency for all pricing.",
  },
] as const;

const PRODUCT_FAQ = [
  {
    q: "Does it support multiple locations?",
    a: "Yes. Multi-location support is included in the Enterprise plan.",
  },
  {
    q: "Is patient data secure?",
    a: "Absolutely. We use encrypted storage, role-based access, and strict audit trails.",
  },
  {
    q: "Can therapists access notes remotely?",
    a: "Yes. Therapists can securely access their notes and schedules from anywhere.",
  },
] as const;

export default function FaqPage() {
  return (
    <div className="bg-background pb-2xl pt-2xl">
      <MarketingPageHero
        title="Frequently asked questions"
        description="Answers to the most common questions about Ordella Physio."
      />

      <FAQSection title="General" items={[...GENERAL_FAQ]} />

      <FAQSection
        className="bg-muted/40 py-2xl max-sm:py-xl"
        title="Pricing & billing"
        items={[...PRICING_FAQ]}
      />

      <FAQSection title="Product" items={[...PRODUCT_FAQ]} />

      <section className="marketing-container mt-2xl py-2xl text-center max-sm:mt-xl max-sm:py-xl">
        <ScrollReveal>
          <h2 className={cn("mb-md", marketingHeading.h2)}>Still have questions?</h2>
          <p className={cn("mx-auto mb-xl max-w-xl text-lg", marketingHeading.body)}>
            Our team is here to help you understand how Ordella Physio fits your clinic.
          </p>
          <Button asChild size="lg" className={marketingButtonPrimaryClass}>
            <CtaLink href="/contact" location="faq" label="Contact us">
              Contact Us
            </CtaLink>
          </Button>
        </ScrollReveal>
      </section>
    </div>
  );
}
