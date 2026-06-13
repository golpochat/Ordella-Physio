"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { CostAlertRecord } from "@/lib/cost-types";

export type CostAlertListProps = {
  alerts: CostAlertRecord[];
  filter?: "all" | "BUDGET_SOFT" | "BUDGET_HARD" | "ANOMALY";
  onResolve?: (id: string) => void;
};

function severityVariant(severity: CostAlertRecord["severity"]) {
  if (severity === "CRITICAL") return "destructive" as const;
  if (severity === "WARNING") return "outline" as const;
  return "secondary" as const;
}

export function CostAlertList({ alerts, filter = "all", onResolve }: CostAlertListProps) {
  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.type === filter);

  return (
    <DataTable columns={["Type", "Severity", "Message", "Created", "Status", "Actions"]} grid="default" isEmpty={!filtered.length} emptyMessage="No cost alerts.">
      {filtered.map((alert) => (
        <Row key={alert.id}>
          <div>{alert.type}</div>
          <div><Badge variant={severityVariant(alert.severity)}>{alert.severity}</Badge></div>
          <div>{alert.message}</div>
          <div>{new Date(alert.createdAt).toLocaleString()}</div>
          <div>{alert.resolvedAt ? "Resolved" : "Open"}</div>
          <div>
            {!alert.resolvedAt && onResolve ? (
              <Button type="button" variant="ghost" onClick={() => onResolve(alert.id)}>Resolve</Button>
            ) : null}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
