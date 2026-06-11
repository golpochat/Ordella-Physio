import { PricingPageContent } from "@/components/marketing/PricingPageContent";
import { generateSEO, pageUrl, softwareApplicationJsonLd, withJsonLd } from "../seo";

export const metadata = withJsonLd(
  generateSEO({
    title: "Pricing",
    description: "Simple, transparent pricing for clinics of all sizes.",
    url: pageUrl("/pricing"),
  }),
  softwareApplicationJsonLd,
);

export default function PricingPage() {
  return <PricingPageContent />;
}
