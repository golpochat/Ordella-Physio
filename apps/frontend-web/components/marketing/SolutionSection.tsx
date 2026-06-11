import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { marketingGridCards, marketingHeading } from "@/lib/marketing-ui";

export type SolutionSectionProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
};

export function SolutionSection({ title, subtitle, children, className }: SolutionSectionProps) {
  return (
    <section className={cn("marketing-container py-2xl max-sm:py-xl", className)}>
      <h2 className={cn("mb-md", marketingHeading.h2)}>{title}</h2>
      <p className={cn("mb-xl", marketingHeading.subtitle)}>{subtitle}</p>
      <div className={marketingGridCards}>{children}</div>
    </section>
  );
}
