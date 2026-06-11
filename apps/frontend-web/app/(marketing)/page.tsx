import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/marketing/CtaLink";
import Hero from "@/components/marketing/Hero";
import { HomeFeature } from "@/components/marketing/HomeFeature";
import { HomeSection } from "@/components/marketing/HomeSection";
import { HomeTestimonial } from "@/components/marketing/HomeTestimonial";
import { HomeWorkflow } from "@/components/marketing/HomeWorkflow";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { marketingButtonPrimaryClass, marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";
import { generateSEO, pageUrl, softwareApplicationJsonLd, withJsonLd } from "./seo";

export const metadata = withJsonLd(
  generateSEO({
    title: "Home",
    description:
      "A complete platform for clinics, therapists, and patients. Scheduling, billing, notes, reporting, and more.",
    url: pageUrl(),
  }),
  softwareApplicationJsonLd,
);

export default function MarketingHomePage() {
  return (
    <>
      <Hero />

      <HomeSection
        title="A unified platform for modern physiotherapy clinics"
        subtitle="Everything your clinic needs — appointments, notes, billing, messaging, analytics — all in one place."
      >
        <div className="fade-in-stagger grid grid-cols-1 gap-lg md:grid-cols-3">
          <HomeFeature
            icon="🗓️"
            title="Smart scheduling"
            description="Manage therapist availability, appointments, reminders, and calendar sync."
          />
          <HomeFeature
            icon="📋"
            title="Clinical notes"
            description="Structured templates, SOAP notes, audit trails, and secure documentation."
          />
          <HomeFeature
            icon="💶"
            title="Billing & invoicing"
            description="Generate invoices, track payments, and manage insurance workflows."
          />
        </div>
      </HomeSection>

      <HomeSection
        title="Built around real clinic workflows"
        subtitle="Ordella Physio adapts to the way physiotherapy clinics actually operate."
        className="bg-brand-light/50"
      >
        <div className="fade-in-stagger space-y-xl">
          <HomeWorkflow
            step="1"
            title="Book & intake"
            description="Patients book online or through staff, with automated reminders."
          />
          <HomeWorkflow
            step="2"
            title="Treat & document"
            description="Therapists complete notes, update plans, and track progress."
          />
          <HomeWorkflow
            step="3"
            title="Bill & analyze"
            description="Invoices, payments, and analytics all flow automatically."
          />
        </div>
      </HomeSection>

      <HomeSection
        centered
        title="Trusted by clinics"
        titleId="testimonials-title"
        subtitle="Clinics across Europe rely on Ordella Physio to streamline operations and improve patient care."
      >
        <div className="fade-in-stagger grid grid-cols-1 gap-lg md:grid-cols-3">
          <HomeTestimonial
            quote="Ordella Physio has transformed how our clinic operates — everything is faster and clearer."
            author="Sarah M."
            role="Clinic Owner"
          />
          <HomeTestimonial
            quote="The scheduling and notes system saves me hours every week."
            author="James T."
            role="Senior Physiotherapist"
          />
          <HomeTestimonial
            quote="Finally, software that understands how clinics actually work."
            author="Laura K."
            role="Practice Manager"
          />
        </div>
      </HomeSection>

      <section
        className="marketing-container py-2xl text-center"
        aria-labelledby="home-cta-title"
      >
        <ScrollReveal>
          <h2 id="home-cta-title" className={cn("mb-md", marketingHeading.h2)}>
            Ready to modernize your clinic?
          </h2>
          <p className={cn("mx-auto mb-xl max-w-xl text-lg", marketingHeading.body)}>
            Start your journey with Ordella Physio and experience a unified, intelligent clinic
            platform.
          </p>
          <Button asChild size="lg" className={marketingButtonPrimaryClass}>
            <CtaLink href="/contact" location="home_cta" label="Contact us to get started">
              Contact us to get started
            </CtaLink>
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
