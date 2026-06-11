import type { ReactNode } from "react";
import { Card } from "@/components/dashboard/Card";
import { Row } from "@/components/dashboard/Row";
import type { DashboardGridKey } from "@/components/dashboard/Grid";
import { cn } from "@/lib/cn";

export type DashboardTableProps = {
  columns: string[];
  emptyMessage: string;
  isEmpty?: boolean;
  grid?: DashboardGridKey;
  children: ReactNode;
  className?: string;
};

export function DashboardTable({
  columns,
  emptyMessage,
  isEmpty = false,
  grid = "default",
  children,
  className,
}: DashboardTableProps) {
  if (isEmpty) {
    return (
      <Card className={cn("dashboard-empty-card", className)}>
        <p className="dashboard-empty">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card grid={grid} className={cn("dashboard-table", className)}>
      <Row header>
        {columns.map((column) => (
          <span key={column} className="dashboard-cell dashboard-cell-header">
            {column}
          </span>
        ))}
      </Row>
      <div className="dashboard-table-body">{children}</div>
    </Card>
  );
}
