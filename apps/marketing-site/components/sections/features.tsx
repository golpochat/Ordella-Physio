"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "@/components/cards/feature-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { FEATURES } from "@/lib/content";
import { viewportOnce } from "@/lib/motion";

export function FeaturesSection() {
  return (
    <Section id="features" variant="muted">
      <SectionHeader
        eyebrow="Features"
        title="Everything your clinic needs"
        description="From first appointment to final invoice — Ordella keeps your team aligned."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </motion.div>
    </Section>
  );
}
