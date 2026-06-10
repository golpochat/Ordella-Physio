import { FeatureDetailCard } from "@/components/cards/feature-card";
import { Section, SectionHeader } from "@/components/layout/section";
import { FinalCtaSection } from "@/components/marketing/final-cta";
import { createMetadata } from "@/lib/seo";
import { detailedFeatures } from "@/lib/content";

export const metadata = createMetadata({
  title: "Features",
  description: "Explore Ordella Physio features — scheduling, patient management, SOAP notes, billing, reporting, and more.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <Section className="pt-16">
        <SectionHeader
          eyebrow="Features"
          title="Powerful tools for modern clinics"
          description="Everything you need to run an efficient, patient-centered physiotherapy practice."
        />
      </Section>
      <Section variant="muted" className="py-0">
        <div className="space-y-20 pb-20">
          {detailedFeatures.map((feature, index) => (
            <div key={feature.id} className={index % 2 === 1 ? "md:[&>div]:flex-row-reverse" : undefined}>
              <FeatureDetailCard title={feature.title} description={feature.description} icon={feature.icon} />
            </div>
          ))}
        </div>
      </Section>
      <FinalCtaSection />
    </>
  );
}
