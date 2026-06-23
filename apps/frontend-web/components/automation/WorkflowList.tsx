"use client";

import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { TableActionLink, TableRowActions } from "@/components/ui/table-row-actions";
import type { WorkflowRecord } from "@/lib/automation-types";
import { cn } from "@/lib/cn";

function formatDateTime(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function triggerBadgeLabel(trigger: WorkflowRecord["trigger"]): string {
  if (trigger.type === "EVENT") {
    return trigger.eventKey?.replaceAll("_", " ") ?? "EVENT";
  }
  if (trigger.type === "SCHEDULE") {
    return "SCHEDULE";
  }
  return "THRESHOLD";
}

function statusClass(status?: "SUCCESS" | "FAILED" | "RUNNING"): string {
  if (status === "SUCCESS") {
    return "automation-status-pill automation-status-pill-success";
  }
  if (status === "FAILED") {
    return "automation-status-pill automation-status-pill-failed";
  }
  if (status === "RUNNING") {
    return "automation-status-pill automation-status-pill-running";
  }
  return "automation-status-pill";
}

export type WorkflowListProps = {
  workflows: WorkflowRecord[];
  isBusy?: boolean;
  onToggleActive: (id: string, isActive: boolean) => void;
};

export function WorkflowList({ workflows, isBusy = false, onToggleActive }: WorkflowListProps) {
  return (
    <DataTable
      columns={["Name", "Trigger", "Status", "Last run", "Actions"]}
      grid="default"
      emptyMessage="No workflows configured yet."
      isEmpty={workflows.length === 0}
    >
      {workflows.map((workflow) => (
        <Row key={workflow.id}>
          <div>
            <div className="automation-list-name">{workflow.name}</div>
            {workflow.description ? (
              <div className="dashboard-cell-muted">{workflow.description}</div>
            ) : null}
            {workflow.dryRun ? <Badge variant="secondary">Dry run</Badge> : null}
          </div>
          <div>
            <Badge variant="secondary">{triggerBadgeLabel(workflow.trigger)}</Badge>
          </div>
          <div>
            <label className="automation-active-toggle">
              <input
                type="checkbox"
                checked={workflow.isActive}
                disabled={isBusy}
                onChange={(event) => onToggleActive(workflow.id, event.target.checked)}
              />
              <span>{workflow.isActive ? "Active" : "Inactive"}</span>
            </label>
          </div>
          <div>
            {workflow.lastRun ? (
              <div className="automation-last-run">
                <span className={cn(statusClass(workflow.lastRun.status))}>{workflow.lastRun.status}</span>
                <span className="dashboard-cell-muted">{formatDateTime(workflow.lastRun.startedAt)}</span>
              </div>
            ) : (
              <span className="dashboard-cell-muted">Never</span>
            )}
          </div>
          <TableRowActions>
            <TableActionLink
              href={`/clinic/automation/workflows/${workflow.id}/edit`}
              label={`Edit workflow ${workflow.name}`}
              icon="edit"
            />
            <TableActionLink
              href={`/clinic/automation/workflows/history?workflowId=${workflow.id}`}
              label={`View history for ${workflow.name}`}
              icon="view"
            />
          </TableRowActions>
        </Row>
      ))}
    </DataTable>
  );
}
