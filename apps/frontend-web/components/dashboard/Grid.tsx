import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const DASHBOARD_GRID = {
  users: "1.5fr 1.5fr 1fr 1fr auto",
  roles: "1.2fr 2fr 1fr 1.2fr auto",
  tenants: "1.5fr 1fr 1.5fr 1fr auto",
  system: "1fr auto",
  default: "1.5fr 1.5fr 1fr 1fr auto",
  list: "1fr auto",
  billing: "1.2fr 1fr 1fr auto",
} as const;

export type DashboardGridKey = keyof typeof DASHBOARD_GRID;

export type GridProps = {
  children: ReactNode;
  variant?: DashboardGridKey;
  className?: string;
};

export function Grid({ children, variant, className }: GridProps) {
  const style = variant
    ? ({ "--dashboard-grid": DASHBOARD_GRID[variant] } as CSSProperties)
    : undefined;

  return (
    <div className={cn("dashboard-grid", className)} style={style}>
      {children}
    </div>
  );
}
