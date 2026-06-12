import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const DASHBOARD_GRID = {
  users: "1.5fr 1.5fr 1fr 1fr auto",
  usersTable: "auto 1.2fr 1.5fr 1fr 1fr 1fr minmax(12rem, 1.4fr)",
  roles: "1.2fr 2fr 1fr 1.2fr auto",
  tenants: "1.5fr 1fr 1.5fr 1fr auto",
  system: "1fr auto",
  default: "1.5fr 1.5fr 1fr 1fr auto",
  list: "1fr auto",
  billing: "1.2fr 1fr 1fr auto",
  audit: "1.2fr 1.2fr 1fr 1fr 1fr 1.5fr auto",
  organizationsTable: "1.2fr 1fr 1.5fr 1fr 1fr minmax(10rem, 1.2fr)",
  organizationTenantsTable: "1.2fr 1fr 1fr minmax(8rem, 1fr)",
  locationsTable: "1.2fr 1fr 1.5fr 1fr 1fr 1fr minmax(10rem, 1.2fr)",
  terminalsTable: "1.2fr 1fr 0.8fr 1fr 1fr 0.8fr 1fr 1fr minmax(10rem, 1.2fr)",
  rolesTable: "1.2fr 1fr 0.8fr 0.8fr 1fr minmax(10rem, 1.2fr)",
  staffTable:
    "1.2fr 1.2fr 1fr 0.9fr 1fr 1.2fr 0.8fr 1fr minmax(10rem, 1.2fr)",
  patientTable:
    "1.2fr 1fr 1.2fr 0.8fr 1fr 0.8fr 1fr minmax(10rem, 1.2fr)",
  patientNotesTable:
    "1.2fr 0.9fr 1fr 1fr minmax(10rem, 1.2fr)",
  patientAttachmentsTable:
    "1.2fr 0.8fr 0.7fr 1fr 1fr minmax(10rem, 1.2fr)",
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
