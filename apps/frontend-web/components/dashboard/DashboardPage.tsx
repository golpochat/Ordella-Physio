import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type DashboardPageProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardPage({ children, className }: DashboardPageProps) {
  return <div className={cn("dashboard-page", className)}>{children}</div>;
}
