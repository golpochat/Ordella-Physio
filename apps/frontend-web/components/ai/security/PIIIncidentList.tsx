"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { PIIIncidentRecord } from "@/lib/security-types";

export type PIIIncidentListProps = {
  incidents: PIIIncidentRecord[];
  onSelect?: (incident: PIIIncidentRecord) => void;
  onResolve?: (id: string) => void;
};

function severity(type: PIIIncidentRecord["piiType"]) {
  if (type === "ID_NUMBER") return "destructive" as const;
  if (type === "EMAIL" || type === "PHONE") return "outline" as const;
  return "secondary" as const;
}

export function PIIIncidentList({ incidents, onSelect, onResolve }: PIIIncidentListProps) {
  return (
    <DataTable columns={["Type", "Model", "Detected", "Status", "Actions"]} grid="default" isEmpty={!incidents.length} emptyMessage="No PII incidents.">
      {incidents.map((incident) => (
        <Row key={incident.id}>
          <div><Badge variant={severity(incident.piiType)}>{incident.piiType}</Badge></div>
          <div>{incident.modelId ?? "—"}</div>
          <div>{new Date(incident.detectedAt).toLocaleString()}</div>
          <div>{incident.resolvedAt ? "Resolved" : "Open"}</div>
          <div className="automation-builder-actions">
            {onSelect ? <Button type="button" variant="ghost" onClick={() => onSelect(incident)}>Details</Button> : null}
            {!incident.resolvedAt && onResolve ? (
              <Button type="button" variant="ghost" onClick={() => onResolve(incident.id)}>Resolve</Button>
            ) : null}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
