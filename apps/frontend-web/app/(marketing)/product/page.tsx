import { CtaLink } from "@/components/marketing/CtaLink";
import { ProductHero } from "@/components/marketing/product/ProductHero";
import { ProductModule } from "@/components/marketing/product/ProductModule";
import { ProductSection } from "@/components/marketing/product/ProductSection";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { generateSEO, pageUrl, softwareApplicationJsonLd, withJsonLd } from "../seo";

export const metadata = withJsonLd(
  generateSEO({
    title: "Product",
    description: "Explore the full Ordella Physio platform — built for modern clinics.",
    url: pageUrl("/product"),
  }),
  softwareApplicationJsonLd,
);

export default function ProductPage() {
  return (
    <div className="product-page bg-background">
      <ProductHero />

      <ProductSection
        title="Core modules"
        subtitle="Every module is designed to work together with no data silos or duplicate entry."
      >
        <ProductModule
          variant="calendar"
          title="Appointments"
          description="Scheduling, calendar sync, therapist availability, and automated reminders."
        />
        <ProductModule
          reverse
          variant="portal"
          title="Patients"
          description="Profiles, intake forms, treatment plans, and care history."
        />
        <ProductModule
          variant="dashboard"
          title="Clinical Notes"
          description="Structured documentation, templates, audit trails, and secure storage."
        />
      </ProductSection>

      <ProductSection
        className="bg-muted/40"
        title="Built around real clinic workflows"
        subtitle="Ordella Physio adapts to the way physiotherapy clinics actually operate."
      >
        <ProductModule
          variant="dashboard"
          title="End-to-end workflow"
          description="From booking to discharge, every step is connected and automated."
        />
        <ProductModule
          reverse
          variant="billing"
          title="Performance insights"
          description="Track therapist performance, patient outcomes, and clinic KPIs."
        />
        <ProductModule
          variant="portal"
          title="Communication"
          description="Secure messaging between therapists, staff, and patients."
        />
      </ProductSection>

      <ProductSection
        title="Platform capabilities"
        subtitle="A modern, scalable platform designed for multi-location clinics."
      >
        <ProductModule
          variant="dashboard"
          title="Multi-tenant architecture"
          description="Each clinic operates in its own secure environment with isolated data."
        />
        <ProductModule
          reverse
          variant="portal"
          title="Role-based access"
          description="Fine-grained permissions for admins, therapists, staff, and patients."
        />
        <ProductModule
          variant="billing"
          title="Fast & reliable"
          description="Optimized performance, global infrastructure, and enterprise-grade security."
        />
      </ProductSection>

      <section className="product-cta marketing-container" aria-labelledby="product-cta-title">
        <ScrollReveal>
          <h2 id="product-cta-title" className="product-cta-title">
            Ready to modernize your clinic?
          </h2>
          <p className="product-cta-subtitle">
            Start your journey with Ordella Physio and experience a unified, intelligent clinic
            platform.
          </p>
          <CtaLink
            href="/contact"
            location="product"
            label="Get started"
            className="hero-cta-primary ripple btn-lift"
          >
            Get Started
          </CtaLink>
        </ScrollReveal>
      </section>
    </div>
  );
}
