"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { INTEGRATIONS } from "@/lib/content";
import { viewportOnce } from "@/lib/motion";

export function IntegrationsSection() {
  return (
    <Section variant="muted">
      <SectionHeader
        eyebrow="Integrations"
        title="Connects with your favourite tools"
        description="Ordella integrates with the platforms your clinic already uses."
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {INTEGRATIONS.map((name) => (
          <div
            key={name}
            className="rounded-lg border bg-background px-6 py-4 text-sm font-semibold text-muted-foreground shadow-sm"
          >
            {name}
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
