import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Ordella Physio terms of service.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <Section className="pt-16">
      <SectionHeader title="Terms of Service" description="Last updated: June 2026" align="left" />
      <div className="max-w-3xl">
        <p className="text-muted-foreground">
          This is a placeholder terms of service. Replace with your legal team&apos;s approved content before launch.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Acceptance of terms</h2>
        <p className="mt-2 text-muted-foreground">
          By accessing or using Ordella Physio, you agree to be bound by these terms and our privacy policy.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Use of service</h2>
        <p className="mt-2 text-muted-foreground">
          You agree to use the service only for lawful purposes and in accordance with applicable healthcare regulations.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-muted-foreground">For questions about these terms, contact legal@ordella.com.</p>
      </div>
    </Section>
  );
}
