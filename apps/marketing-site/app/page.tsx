import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/hero";

const FeaturesSection = dynamic(
  () => import("@/components/sections/features").then((m) => m.FeaturesSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/30" /> },
);
const ProductOverviewSection = dynamic(
  () => import("@/components/sections/product-overview").then((m) => m.ProductOverviewSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/30" /> },
);
const StatsSection = dynamic(
  () => import("@/components/sections/stats").then((m) => m.StatsSection),
  { loading: () => <div className="h-32 animate-pulse bg-muted/30" /> },
);
const PricingSection = dynamic(
  () => import("@/components/sections/pricing").then((m) => m.PricingSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/30" /> },
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/testimonials").then((m) => m.TestimonialsSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/30" /> },
);
const IntegrationsSection = dynamic(
  () => import("@/components/sections/integrations").then((m) => m.IntegrationsSection),
  { loading: () => <div className="h-48 animate-pulse bg-muted/30" /> },
);
const FaqSection = dynamic(
  () => import("@/components/sections/faq").then((m) => m.FaqSection),
  { loading: () => <div className="h-64 animate-pulse bg-muted/30" /> },
);
const CtaSection = dynamic(
  () => import("@/components/sections/cta").then((m) => m.CtaSection),
  { loading: () => <div className="h-48 animate-pulse bg-muted/30" /> },
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <ProductOverviewSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
