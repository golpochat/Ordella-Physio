import type { Metadata } from "next";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaSection } from "@/components/marketing/cta-section";
import { ScreenshotPlaceholder } from "@/components/marketing/screenshot-placeholder";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PRODUCT_MODULES } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Product — Ordella Physio",
  description: "Overview of the Ordella Physio platform and its core modules.",
};

export default function ProductPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="Product"
            title="One platform for your entire clinic"
            description="Ordella Physio unifies appointments, patient records, clinical documentation, billing, and communication in a tenant-aware, role-based system."
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <ScreenshotPlaceholder label="Platform overview screenshot placeholder" />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            title="Core modules"
            description="Every module is designed to work together — no data silos, no duplicate entry."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_MODULES.map((module) => (
              <Card key={module.name}>
                <CardHeader>
                  <CardTitle>{module.name}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            title="See it in action"
            description="Screenshots and demos will be added here."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <ScreenshotPlaceholder label="Appointments module screenshot" />
            <ScreenshotPlaceholder label="Billing module screenshot" />
            <ScreenshotPlaceholder label="Clinical notes screenshot" />
            <ScreenshotPlaceholder label="Patient portal screenshot" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
