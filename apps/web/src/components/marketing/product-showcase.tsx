"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/layout/section";

export function ProductShowcaseSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Product"
        title="Built for busy clinics"
        description="A clean, intuitive dashboard that your whole team will actually enjoy using."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        {["Dashboard overview", "Appointment calendar"].map((label, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group overflow-hidden rounded-2xl border shadow-lg"
          >
            <div className="border-b bg-muted/50 px-4 py-3 text-sm font-medium">{label}</div>
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
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
