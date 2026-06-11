import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn("dashboard-badge", `dashboard-badge-${variant}`, className)}>
      {children}
    </span>
  );
}
