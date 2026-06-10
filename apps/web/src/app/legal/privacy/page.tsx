import { Section, SectionHeader } from "@/components/layout/section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Ordella Physio privacy policy.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <Section className="pt-16">
      <SectionHeader title="Privacy Policy" description="Last updated: June 2026" centered={false} />
      <div className="prose prose-neutral max-w-3xl dark:prose-invert">
        <p className="text-muted-foreground">
          This is a placeholder privacy policy. Replace with your legal team&apos;s approved content before launch.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Information we collect</h2>
        <p className="text-muted-foreground">
          We collect information you provide when creating an account, using our services, or contacting support.
        </p>
        <h2 className="mt-8 text-xl font-semibold">How we use your data</h2>
        <p className="text-muted-foreground">
          We use collected data to provide, maintain, and improve Ordella Physio services.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground">
          For privacy-related inquiries, contact privacy@ordella.com.
        </p>
      </div>
    </Section>
  );
}
