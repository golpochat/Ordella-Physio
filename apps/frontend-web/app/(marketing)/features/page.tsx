import type { Metadata } from "next";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaSection } from "@/components/marketing/cta-section";
import { FeatureIcon } from "@/components/marketing/feature-icon";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CORE_FEATURES } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Features — Ordella Physio",
  description: "Explore the core features of Ordella Physio for physiotherapy clinic management.",
};

export default function FeaturesPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="Features"
            title="Powerful tools for every role"
            description="Ordella Physio is built around the workflows that matter most to physiotherapy clinics."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_FEATURES.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <FeatureIcon icon={feature.icon} />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
