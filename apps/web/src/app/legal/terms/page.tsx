import { Section, SectionHeader } from "@/components/layout/section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Ordella Physio terms of service.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <Section className="pt-16">
      <SectionHeader title="Terms of Service" description="Last updated: June 2026" centered={false} />
      <div className="prose prose-neutral max-w-3xl dark:prose-invert">
        <p className="text-muted-foreground">
          This is a placeholder terms of service document. Replace with your legal team&apos;s approved content before launch.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Acceptance of terms</h2>
        <p className="text-muted-foreground">
          By accessing or using Ordella Physio, you agree to be bound by these terms.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Use of service</h2>
        <p className="text-muted-foreground">
          You may use our services only in compliance with applicable laws and these terms.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Limitation of liability</h2>
        <p className="text-muted-foreground">
          Ordella Physio is provided &quot;as is&quot; without warranties of any kind, to the extent permitted by law.
        </p>
      </div>
    </Section>
  );
}
