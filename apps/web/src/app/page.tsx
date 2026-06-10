import dynamic from "next/dynamic";
import { HeroSection } from "@/components/marketing/hero-section";

const FeaturesOverviewSection = dynamic(
  () => import("@/components/marketing/features-overview").then((m) => m.FeaturesOverviewSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/30" /> },
);
const ProductShowcaseSection = dynamic(
  () => import("@/components/marketing/product-showcase").then((m) => m.ProductShowcaseSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/30" /> },
);
const BenefitsSection = dynamic(
  () => import("@/components/marketing/benefits-section").then((m) => m.BenefitsSection),
  { loading: () => <div className="h-64 animate-pulse bg-muted/30" /> },
);
const TestimonialsSection = dynamic(
  () => import("@/components/marketing/testimonials-section").then((m) => m.TestimonialsSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/30" /> },
);
const PricingPreviewSection = dynamic(
  () => import("@/components/marketing/pricing-preview").then((m) => m.PricingPreviewSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/30" /> },
);
const FinalCtaSection = dynamic(
  () => import("@/components/marketing/final-cta").then((m) => m.FinalCtaSection),
  { loading: () => <div className="h-48 animate-pulse bg-muted/30" /> },
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesOverviewSection />
      <ProductShowcaseSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <FinalCtaSection />
    </>
  );
}
