import { CtaLink } from "@/components/marketing/CtaLink";
import { ProductMockup } from "@/components/marketing/product-mockup";

const heroCtaPrimaryClass = "hero-cta-primary ripple btn-lift";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="marketing-container hero-inner">
        <p className="hero-eyebrow fade-in">Enterprise physiotherapy SaaS</p>
        <h1 id="hero-title" className="hero-title fade-in">
          Run your clinic on one secure, enterprise-grade platform
        </h1>

        <p className="hero-subtitle fade-in-delayed">
          Ordella Physio unifies scheduling, clinical notes, billing, and analytics for growing
          physiotherapy organizations — with tenant isolation, role-based access, and a 14-day free
          trial to get started today.
        </p>

        <div className="hero-cta-group fade-in-stagger">
          <CtaLink
            href="/start-trial"
            location="hero"
            label="Start free trial"
            className={heroCtaPrimaryClass}
          >
            Start Free Trial
          </CtaLink>
          <CtaLink
            href="/pricing"
            location="hero"
            label="View pricing"
            className="hero-cta-secondary ripple"
          >
            View Pricing
          </CtaLink>
        </div>

        <div className="hero-image mx-auto w-full max-w-full sm:max-w-5xl">
          <ProductMockup variant="dashboard" priority />
        </div>
      </div>
    </section>
  );
}
