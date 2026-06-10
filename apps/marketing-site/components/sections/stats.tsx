"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { STATS } from "@/lib/content";
import { viewportOnce } from "@/lib/motion";

export function StatsSection() {
  return (
    <Section variant="accent" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
