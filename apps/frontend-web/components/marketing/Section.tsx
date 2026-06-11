import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "gradient" | "brand";
  id?: string;
  containerClassName?: string;
  size?: "major" | "sub" | "hero";
};

const variantClasses: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "bg-background",
  muted: "bg-muted/40",
  gradient: "bg-brand-gradient",
  brand: "bg-primary text-primary-foreground",
};

const sizeClasses: Record<NonNullable<SectionProps["size"]>, string> = {
  hero: "py-3xl max-sm:py-2xl",
  major: "py-2xl max-sm:py-xl",
  sub: "py-xl max-sm:py-lg",
};

export function Section({
  children,
  className,
  variant = "default",
  id,
  containerClassName,
  size = "major",
}: SectionProps) {
  return (
    <section id={id} className={cn(sizeClasses[size], variantClasses[variant], className)}>
      <div className={cn("marketing-container", containerClassName)}>{children}</div>
    </section>
  );
}
