import { AboutSection } from "@/components/marketing/AboutSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";
import { generateSEO, pageUrl } from "../seo";

export const metadata = generateSEO({
  title: "Privacy Policy",
  description: "How Ordella Physio collects, uses, and protects your data.",
  url: pageUrl("/privacy"),
});

export default function PrivacyPage() {
  return (
    <div className="bg-background pb-2xl pt-2xl">
      <MarketingPageHero
        title="Privacy Policy"
        description="How we collect, use, and protect information when you use Ordella Physio."
      />

      <AboutSection title="Overview">
        <p className={cn("max-w-3xl text-brand-gray", marketingHeading.body)}>
          Ordella Physio is committed to protecting the privacy of clinics, staff, and patients. This
          policy describes the types of information we process, why we process it, and the choices
          available to you.
        </p>
      </AboutSection>

      <AboutSection className="bg-muted/40" title="Information we collect">
        <ul className={cn("max-w-3xl list-disc space-y-sm pl-md text-brand-gray", marketingHeading.body)}>
          <li>Account details such as name, email, role, and clinic affiliation.</li>
          <li>Operational data including appointments, clinical notes, billing, and communications.</li>
          <li>Technical data such as device type, browser, and usage logs for security and support.</li>
        </ul>
      </AboutSection>

      <AboutSection title="How we use information">
        <ul className={cn("max-w-3xl list-disc space-y-sm pl-md text-brand-gray", marketingHeading.body)}>
          <li>To provide and improve the platform and its features.</li>
          <li>To authenticate users and enforce role-based access controls.</li>
          <li>To support billing, notifications, reporting, and audit requirements.</li>
          <li>To maintain security, prevent abuse, and comply with legal obligations.</li>
        </ul>
      </AboutSection>

      <AboutSection className="bg-muted/40" title="Contact">
        <p className={cn("max-w-3xl text-brand-gray", marketingHeading.body)}>
          Questions about this policy can be sent through our{" "}
          <a href="/contact" className="text-primary hover:underline">
            contact page
          </a>
          .
        </p>
      </AboutSection>
    </div>
  );
}
