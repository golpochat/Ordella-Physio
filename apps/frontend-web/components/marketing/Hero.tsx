import { ExperimentCta } from "@/components/marketing/ExperimentCta";
import { CtaLink } from "@/components/marketing/CtaLink";
import { ProductMockup } from "@/components/marketing/product-mockup";

const heroCtaPrimaryClass = "hero-cta-primary ripple btn-lift";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="marketing-container hero-inner">
        <h1 id="hero-title" className="hero-title fade-in">
          Modern physiotherapy software for clinics that want to grow
        </h1>

        <p className="hero-subtitle fade-in-delayed">
          Ordella Physio brings appointments, notes, billing, messaging, and analytics into one
          clean, powerful platform — built for modern clinics.
        </p>

        <div className="hero-cta-group fade-in-stagger">
          <ExperimentCta
            experimentId="hero_cta"
            location="hero"
            variantA={{
              href: "/contact",
              label: "Get started",
              children: "Get Started",
              buttonClassName: heroCtaPrimaryClass,
            }}
            variantB={{
              href: "/contact",
              label: "Book a demo",
              children: "Book a Demo",
              buttonClassName: heroCtaPrimaryClass,
            }}
          />
          <CtaLink
            href="/product"
            location="hero"
            label="See product overview"
            className="hero-cta-secondary ripple"
          >
            See Product
          </CtaLink>
        </div>

        <div className="hero-image mx-auto w-full max-w-full sm:max-w-5xl">
          <ProductMockup variant="dashboard" priority />
        </div>
      </div>
    </section>
  );
}
