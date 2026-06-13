"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { BottleneckAlert } from "@/lib/observability-types";

export type BottleneckAlertsProps = {
  alerts: BottleneckAlert[];
  onDetect?: () => void;
  onResolve?: (id: string) => void;
  detecting?: boolean;
};

function severityVariant(severity: string) {
  if (severity === "critical" || severity === "high") return "destructive" as const;
  if (severity === "medium") return "outline" as const;
  return "secondary" as const;
}

export function BottleneckAlerts({ alerts, onDetect, onResolve, detecting }: BottleneckAlertsProps) {
  return (
    <div className="ai-observability-bottlenecks">
      <div className="ai-observability-actions">
        <Button type="button" variant="ghost" onClick={onDetect} disabled={detecting}>
          {detecting ? "Detecting…" : "Run detection"}
        </Button>
      </div>
      <DataTable columns={["Type", "Entity", "Severity", "Message", "Detected", "Action"]} grid="default" isEmpty={!alerts.length} emptyMessage="No bottleneck alerts.">
        {alerts.map((alert) => (
          <Row key={alert.id}>
            <div>{alert.alertType}</div>
            <div>{alert.entity}</div>
            <div><Badge variant={severityVariant(alert.severity)}>{alert.severity}</Badge></div>
            <div>{alert.message}</div>
            <div>{new Date(alert.detectedAt).toLocaleString()}</div>
            <div>
              {!alert.resolvedAt && onResolve ? (
                <Button type="button" variant="ghost" onClick={() => onResolve(alert.id)}>Resolve</Button>
              ) : (
                <Badge variant="secondary">Resolved</Badge>
              )}
            </div>
          </Row>
        ))}
      </DataTable>
    </div>
  );
}
