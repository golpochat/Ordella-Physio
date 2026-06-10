"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { HeroCta } from "@/components/hero/hero-cta";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <motion.div
        className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Physiotherapy SaaS</p>
          <h1 className="font-display text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Modern Physiotherapy Practice Management
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Scheduling, clinical notes, billing, payments, and patient care — all in one beautiful platform.
          </p>
          <HeroCta />
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              14-day free trial
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              No credit card required
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-2xl border bg-card p-4 shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="grid gap-3 rounded-xl bg-muted/50 p-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "24", label: "Today" },
                  { value: "£12.4k", label: "Revenue" },
                  { value: "96%", label: "Fill rate" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-background p-4 shadow-sm">
                    <div className="h-2 w-12 rounded bg-primary/30" />
                    <div className="mt-3 text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-background p-4 shadow-sm">
                <div className="mb-3 h-3 w-1/3 rounded bg-muted" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((row) => (
                    <div key={row} className="flex items-center gap-3 rounded-md bg-muted/40 p-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-1/2 rounded bg-muted" />
                        <div className="h-2 w-1/3 rounded bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
