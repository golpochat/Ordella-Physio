import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { marketingCardClass, marketingHeading } from "@/lib/marketing-ui";

export type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn(marketingCardClass, "fade-in", className)}>
      <div className="marketing-feature-icon">{icon}</div>
      <h3 className={cn("mb-sm", marketingHeading.h4)}>{title}</h3>
      <p className={marketingHeading.body}>{description}</p>
    </div>
  );
}
