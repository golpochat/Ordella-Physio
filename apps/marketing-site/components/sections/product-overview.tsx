"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { viewportOnce } from "@/lib/motion";

const showcases = [
  {
    label: "Dashboard overview",
    title: "See your clinic at a glance",
    description: "Track appointments, revenue, and patient activity from a single command centre.",
  },
  {
    label: "Appointment calendar",
    title: "Scheduling that just works",
    description: "Drag-and-drop calendar with availability rules, blocked slots, and therapist views.",
  },
] as const;

export function ProductOverviewSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Product"
        title="Built for busy clinics"
        description="A clean, intuitive dashboard that your whole team will actually enjoy using."
      />
      <div className="space-y-16">
        {showcases.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`grid items-center gap-8 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">{item.label}</p>
              <h3 className="font-display text-2xl font-bold md:text-3xl">{item.title}</h3>
              <p className="mt-4 text-muted-foreground">{item.description}</p>
            </div>
            <div className="group overflow-hidden rounded-2xl border shadow-lg">
              <div className="border-b bg-muted/50 px-4 py-3 text-sm font-medium">{item.label}</div>
              <div className="aspect-[16/10] bg-gradient-to-br from-accent/40 via-background to-muted p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="flex h-full flex-col gap-4 rounded-xl border bg-background/90 p-4 shadow-inner">
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 rounded bg-muted" />
                    <div className="h-8 w-24 rounded bg-primary/20" />
                  </div>
                  <div className="grid flex-1 grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="rounded-lg bg-muted/60" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
