import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaSection } from "@/components/marketing/cta-section";
import { FeatureIcon } from "@/components/marketing/feature-icon";
import { HeroSection } from "@/components/marketing/landing/hero-section";
import { TestimonialsSection } from "@/components/marketing/landing/testimonials-section";
import { ScreenshotPlaceholder } from "@/components/marketing/screenshot-placeholder";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  INTEGRATIONS,
  LANDING_FEATURES,
  LANDING_SCREENSHOTS,
  LANDING_VALUE_PROPOSITION,
  SUPPORTED_ROLES,
  TESTIMONIALS,
} from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Ordella Physio — Modern Physiotherapy Practice Platform",
  description:
    "A complete platform for clinics, therapists, and patients. Scheduling, billing, notes, reporting, and more.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            centered
            eyebrow="Why Ordella"
            title={LANDING_VALUE_PROPOSITION.headline}
          />
          <div className="mt-8 space-y-4 text-left text-muted-foreground sm:text-center">
            {LANDING_VALUE_PROPOSITION.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="Features"
            title="Everything your clinic needs"
            description="Six core capabilities that power modern physiotherapy practices."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LANDING_FEATURES.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <FeatureIcon icon={feature.icon} />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/features">Explore all features</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="Product"
            title="See Ordella Physio in action"
            description="A glimpse of the dashboards and workflows your team will use every day."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-card p-2 shadow-sm">
                <ScreenshotPlaceholder label={LANDING_SCREENSHOTS[0].label} />
              </div>
            </div>
            {LANDING_SCREENSHOTS.slice(1).map((screenshot) => (
              <div key={screenshot.label} className="rounded-xl border bg-card p-2 shadow-sm">
                <ScreenshotPlaceholder label={screenshot.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Architecture"
                title="Built for multi-tenant scale"
                description="Every clinic on Ordella Physio runs in its own secure, isolated environment."
              />
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Multi-tenancy means your patient data, billing records, and staff accounts never
                  mix with another clinic&apos;s. Each organization gets dedicated storage, custom
                  branding, and independent user management.
                </p>
                <p>
                  Platform admins oversee the entire ecosystem through a super-admin dashboard, while
                  clinic admins control only their own tenant. It&apos;s enterprise-grade isolation
                  with the simplicity of a single SaaS product.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link href="/product">Learn about the platform</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <div className="space-y-4">
                {["Tenant A — Hart Physiotherapy", "Tenant B — Peak Performance", "Tenant C — Riverside Clinic"].map(
                  (tenant) => (
                    <div
                      key={tenant}
                      className="flex items-center justify-between rounded-lg border bg-background px-4 py-3"
                    >
                      <span className="text-sm font-medium">{tenant}</span>
                      <Badge>Isolated</Badge>
                    </div>
                  ),
                )}
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Each tenant operates independently with shared platform infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="Roles"
            title="A dedicated workspace for every team member"
            description="Role-based dashboards ensure each user sees the tools and data relevant to their job."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTED_ROLES.map((role) => (
              <Card key={role.name}>
                <CardHeader>
                  <CardTitle>{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="Integrations"
            title="Connects with the tools you already use"
            description="Placeholder integrations ready for production wiring."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INTEGRATIONS.map((integration) => (
              <Card key={integration.name}>
                <CardHeader>
                  <Badge className="w-fit">{integration.category}</Badge>
                  <CardTitle className="mt-2">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={TESTIMONIALS} />

      <CtaSection
        title="Start your free trial today"
        description="No credit card required. Set up your clinic in minutes and explore every feature for 14 days."
        showPricingLink
      />
    </>
  );
}
