import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { marketingHeading } from "@/lib/marketing-ui";

export type AboutSectionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function AboutSection({ title, subtitle, children, className }: AboutSectionProps) {
  return (
    <section className={cn("marketing-container py-2xl", className)}>
      <h2 className={cn("mb-md", marketingHeading.h2)}>{title}</h2>
      {subtitle ? <p className={cn("mb-xl", marketingHeading.subtitle)}>{subtitle}</p> : null}
      {children}
    </section>
  );
}
