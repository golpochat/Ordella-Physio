import type { CSSProperties, ReactNode } from "react";
import { DASHBOARD_GRID, type DashboardGridKey } from "@/components/dashboard/Grid";
import { cn } from "@/lib/cn";

export type CardProps = {
  children: ReactNode;
  className?: string;
  grid?: DashboardGridKey;
  compact?: boolean;
};

export function Card({ children, className, grid, compact = false }: CardProps) {
  const style = grid
    ? ({ "--dashboard-grid": DASHBOARD_GRID[grid] } as CSSProperties)
    : undefined;

  return (
    <div
      className={cn("dashboard-card", compact && "dashboard-card-compact", className)}
      style={style}
    >
      {children}
    </div>
  );
}
