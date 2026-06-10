import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FAQ_ITEMS } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "FAQ — Ordella Physio",
  description: "Frequently asked questions about Ordella Physio.",
};

export default function FaqPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            centered
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Can't find what you're looking for? Contact our support team."
          />
          <div className="mt-12">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Still have questions?{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              Get in touch
            </Link>
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
