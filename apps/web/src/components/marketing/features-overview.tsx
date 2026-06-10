"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "@/components/cards/feature-card";
import { Section, SectionHeader } from "@/components/layout/section";
import { homeFeatures } from "@/lib/content";

export function FeaturesOverviewSection() {
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
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {homeFeatures.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </motion.div>
    </Section>
  );
}
