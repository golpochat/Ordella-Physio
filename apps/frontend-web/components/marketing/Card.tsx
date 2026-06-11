import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { marketingCardClass } from "@/lib/marketing-ui";

export type MarketingCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function MarketingCard({ children, className, hover = true }: MarketingCardProps) {
  return (
    <div className={cn(marketingCardClass, !hover && "hover:translate-y-0 hover:shadow-soft", className)}>
      {children}
    </div>
  );
}
