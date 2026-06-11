import { ExperimentCta } from "@/components/marketing/ExperimentCta";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { marketingButtonPrimaryClass, marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";
import { SolutionCard } from "@/components/marketing/SolutionCard";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { generateSEO, pageUrl } from "../seo";

export const metadata = generateSEO({
  title: "Solutions",
  description: "Role-based solutions for therapists, staff, and clinic owners.",
  url: pageUrl("/solutions"),
});

export default function SolutionsPage() {
  return (
    <div className="bg-background pb-2xl pt-2xl">
      <MarketingPageHero
        title="Solutions for every part of your clinic"
        description="Ordella Physio adapts to the needs of therapists, staff, and clinic owners — delivering clarity, efficiency, and seamless workflows."
      />

      <SolutionSection
        title="For therapists"
        subtitle="Tools that help clinicians deliver exceptional patient care with less admin work."
      >
        <SolutionCard
          icon="🧑‍⚕️"
          title="Clinical notes"
          description="Fast, structured documentation with templates, audit trails, and secure storage."
        />
        <SolutionCard
          icon="🗓️"
          title="Smart scheduling"
          description="Manage availability, appointments, and reminders with ease."
        />
        <SolutionCard
          icon="📈"
          title="Progress tracking"
          description="Track patient outcomes, treatment plans, and session history."
        />
      </SolutionSection>

      <SolutionSection
        className="bg-muted/40"
        title="For admin & staff"
        subtitle="Everything your front desk and operations team need to run the clinic smoothly."
      >
        <SolutionCard
          icon="📞"
          title="Front desk tools"
          description="Appointment management, patient intake, and communication tools."
        />
        <SolutionCard
          icon="💶"
          title="Billing & invoicing"
          description="Generate invoices, track payments, and manage insurance workflows."
        />
        <SolutionCard
          icon="📨"
          title="Messaging"
          description="Secure communication between staff, therapists, and patients."
        />
      </SolutionSection>

      <SolutionSection
        title="For clinic owners"
        subtitle="Insights and controls that help you grow, manage, and scale your clinic."
      >
        <SolutionCard
          icon="📊"
          title="Analytics & KPIs"
          description="Real-time dashboards for revenue, performance, and clinic operations."
        />
        <SolutionCard
          icon="🏢"
          title="Multi-location support"
          description="Manage multiple clinics with unified reporting and permissions."
        />
        <SolutionCard
          icon="🔐"
          title="Role-based access"
          description="Fine-grained permissions for admins, therapists, staff, and patients."
        />
      </SolutionSection>

      <section className="marketing-container mt-2xl py-2xl text-center">
        <ScrollReveal>
          <h2 className={cn("mb-md", marketingHeading.h2)}>Ready to streamline your clinic?</h2>
          <p className={cn("mx-auto mb-xl max-w-xl text-lg", marketingHeading.body)}>
            Discover how Ordella Physio can transform your clinic&apos;s workflows and patient
            experience.
          </p>
          <ExperimentCta
            experimentId="solutions_cta"
            location="solutions"
            variantA={{
              href: "/contact",
              label: "Solutions get started",
              children: "Get Started",
              buttonClassName: marketingButtonPrimaryClass,
            }}
            variantB={{
              href: "/contact",
              label: "Solutions book a demo",
              children: "Book a Demo",
              buttonClassName: marketingButtonPrimaryClass,
            }}
          />
        </ScrollReveal>
      </section>
    </div>
  );
}
