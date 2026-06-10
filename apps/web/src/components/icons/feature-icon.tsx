"use client";

import {
  BarChart3,
  Bell,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Heart,
  MapPin,
  Receipt,
  Shield,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  users: Users,
  "file-text": FileText,
  receipt: Receipt,
  "credit-card": CreditCard,
  "bar-chart": BarChart3,
  bell: Bell,
  "map-pin": MapPin,
  shield: Shield,
  clock: Clock,
  zap: Zap,
  heart: Heart,
  "trending-up": TrendingUp,
};

export function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Calendar;
  return <Icon className={className} aria-hidden />;
}
