import { AboutSection } from "@/components/marketing/AboutSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";
import { generateSEO, pageUrl } from "../seo";

export const metadata = generateSEO({
  title: "Terms of Service",
  description: "Terms and conditions for using Ordella Physio.",
  url: pageUrl("/terms"),
});

export default function TermsPage() {
  return (
    <div className="bg-background pb-2xl pt-2xl">
      <MarketingPageHero
        title="Terms of Service"
        description="The terms and conditions that apply when you use Ordella Physio."
      />

      <AboutSection title="Agreement">
        <p className={cn("max-w-3xl text-brand-gray", marketingHeading.body)}>
          By accessing or using Ordella Physio, you agree to these terms on behalf of yourself or
          the clinic you represent. If you do not agree, do not use the platform.
        </p>
      </AboutSection>

      <AboutSection className="bg-muted/40" title="Use of the platform">
        <ul className={cn("max-w-3xl list-disc space-y-sm pl-md text-brand-gray", marketingHeading.body)}>
          <li>You must provide accurate account information and keep credentials secure.</li>
          <li>You are responsible for activity under your account and assigned roles.</li>
          <li>You may not misuse the service, attempt unauthorized access, or disrupt other users.</li>
          <li>Clinical and patient data must be handled in accordance with applicable laws.</li>
        </ul>
      </AboutSection>

      <AboutSection title="Availability and changes">
        <p className={cn("max-w-3xl text-brand-gray", marketingHeading.body)}>
          We may update features, pricing, or these terms from time to time. Continued use after
          changes take effect constitutes acceptance of the updated terms. Material changes will be
          communicated through the product or by email where appropriate.
        </p>
      </AboutSection>

      <AboutSection className="bg-muted/40" title="Contact">
        <p className={cn("max-w-3xl text-brand-gray", marketingHeading.body)}>
          Questions about these terms can be sent through our{" "}
          <a href="/contact" className="text-primary hover:underline">
            contact page
          </a>
          .
        </p>
      </AboutSection>
    </div>
  );
}
