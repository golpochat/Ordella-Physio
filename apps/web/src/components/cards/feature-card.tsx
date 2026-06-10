"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureIcon } from "@/components/icons/feature-icon";
import { cn } from "@/lib/utils/cn";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  className?: string;
};

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className={cn("h-full border-border/60 transition-shadow hover:shadow-md", className)}>
        <CardHeader>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FeatureIcon name={icon} className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

export function FeatureDetailCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FeatureIcon name={icon} className="h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
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
    </div>
  );
}
