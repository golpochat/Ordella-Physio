"use client";

import { motion } from "framer-motion";
import { FeatureIcon } from "@/components/icons/feature-icon";
import { Section, SectionHeader } from "@/components/layout/section";
import { benefits } from "@/lib/content";

export function BenefitsSection() {
  return (
    <Section variant="accent">
      <SectionHeader
        eyebrow="Benefits"
        title="Why clinics choose Ordella"
        description="Spend less time on admin and more time with patients."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <FeatureIcon name={benefit.icon} className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
