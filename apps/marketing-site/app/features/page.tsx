"use client";

import { motion } from "framer-motion";
import { CtaSection } from "@/components/sections/cta";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { MODULE_FEATURES } from "@/lib/content";
import { viewportOnce } from "@/lib/motion";

const moduleIcons: Record<string, string> = {
  patients: "👤",
  appointments: "📅",
  notes: "📝",
  billing: "🧾",
  payments: "💳",
  communication: "💬",
  reporting: "📊",
};

export default function FeaturesPage() {
  return (
    <>
      <Section className="pt-16">
        <SectionHeader
          eyebrow="Features"
          title="Powerful tools for modern clinics"
          description="Everything you need to run an efficient, patient-centered physiotherapy practice."
        />
      </Section>
      <Section variant="muted" className="py-0">
        <div className="space-y-20 pb-20">
          {MODULE_FEATURES.map((module, index) => (
            <motion.div
              key={module.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`grid items-center gap-8 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div>
                <span className="mb-4 inline-block text-3xl" aria-hidden>
                  {moduleIcons[module.slug] ?? "✦"}
                </span>
                <h3 className="font-display text-2xl font-bold">{module.title}</h3>
                <p className="mt-3 text-muted-foreground">{module.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li>• Streamlined workflows for your team</li>
                  <li>• Role-based access and audit trails</li>
                  <li>• Built for clinical compliance</li>
                </ul>
              </div>
              <div className="aspect-video rounded-xl border bg-gradient-to-br from-muted to-accent/40 p-6">
                <div className="flex h-full flex-col gap-3">
                  <div className="h-4 w-1/3 rounded bg-primary/20" />
                  <div className="flex-1 rounded-lg border bg-background/80 p-4 shadow-sm">
                    <div className="space-y-2">
                      <div className="h-3 w-2/3 rounded bg-muted" />
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-4/5 rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
