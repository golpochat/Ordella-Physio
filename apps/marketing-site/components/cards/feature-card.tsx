"use client";

import {
  BarChart3,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  Receipt,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@ordella/ui";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  users: Users,
  "file-text": FileText,
  receipt: Receipt,
  "credit-card": CreditCard,
  "bar-chart": BarChart3,
  "message-square": MessageSquare,
  building: Building2,
};

function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Calendar;
  return <Icon className={className} aria-hidden />;
}

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
