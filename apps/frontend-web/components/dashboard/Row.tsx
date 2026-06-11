import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type RowProps = {
  children: ReactNode;
  className?: string;
  header?: boolean;
};

export function Row({ children, className, header = false }: RowProps) {
  return (
    <div className={cn("dashboard-row", header && "dashboard-row-header", className)}>
      {children}
    </div>
  );
}
