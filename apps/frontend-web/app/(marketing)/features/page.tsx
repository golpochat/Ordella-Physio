import { CTASection } from "@/components/marketing/CTASection";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { FeatureSection } from "@/components/marketing/FeatureSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { generateSEO, pageUrl } from "../seo";

export const metadata = generateSEO({
  title: "Features",
  description: "Powerful tools for therapists, staff, and clinic owners.",
  url: pageUrl("/features"),
});

export default function FeaturesPage() {
  return (
    <div className="bg-background">
      <MarketingPageHero
        title="Powerful tools for every role"
        description="Ordella Physio is built around the workflows that matter most to physiotherapy clinics."
        className="mb-0"
      />

      <FeatureSection
        title="Clinical workflows"
        subtitle="Everything clinicians need to deliver exceptional patient care with clarity and efficiency."
      >
        <FeatureCard
          icon="🗓️"
          title="Appointments"
          description="Smart scheduling, calendar sync, reminders, and therapist availability management."
        />
        <FeatureCard
          icon="📋"
          title="Clinical Notes"
          description="Structured templates, SOAP notes, audit trails, and secure documentation."
        />
        <FeatureCard
          icon="🧑‍⚕️"
          title="Patient Profiles"
          description="Full patient history, treatment plans, progress tracking, and attachments."
        />
      </FeatureSection>

      <FeatureSection
        className="bg-muted/40"
        title="Operations & revenue"
        subtitle="Tools that streamline your clinic's daily operations and financial performance."
      >
        <FeatureCard
          icon="💶"
          title="Billing & Invoicing"
          description="Generate invoices, track payments, manage insurance, and automate revenue workflows."
        />
        <FeatureCard
          icon="📊"
          title="Analytics"
          description="Real-time dashboards for appointments, revenue, therapist performance, and clinic KPIs."
        />
        <FeatureCard
          icon="📨"
          title="Messaging"
          description="Secure communication between staff, therapists, and patients."
        />
      </FeatureSection>

      <FeatureSection
        title="Platform capabilities"
        subtitle="A modern, scalable platform designed for multi-location clinics and growing teams."
      >
        <FeatureCard
          icon="🏢"
          title="Multi-tenant architecture"
          description="Each clinic operates in its own secure environment with isolated data."
        />
        <FeatureCard
          icon="🔐"
          title="Role-based access"
          description="Fine-grained permissions for admins, therapists, staff, and patients."
        />
        <FeatureCard
          icon="⚡"
          title="Fast & reliable"
          description="Optimized performance, global infrastructure, and enterprise-grade security."
        />
      </FeatureSection>

      <CTASection />
    </div>
  );
}
