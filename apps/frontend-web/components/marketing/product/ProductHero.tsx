import { ProductMockup } from "@/components/marketing/product-mockup";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function ProductHero() {
  return (
    <section className="product-hero marketing-container" aria-labelledby="product-hero-title">
      <ScrollReveal>
        <h1 id="product-hero-title" className="product-hero-title fade-in">
          Everything your physiotherapy clinic needs — in one platform
        </h1>
        <p className="product-hero-subtitle fade-in-delayed">
          Ordella Physio unifies appointments, notes, billing, messaging, and analytics into a
          clean, modern, powerful workflow designed for growing clinics.
        </p>
        <div className="product-hero-image fade-in-delayed w-full">
          <ProductMockup variant="dashboard" priority />
        </div>
      </ScrollReveal>
    </section>
  );
}
