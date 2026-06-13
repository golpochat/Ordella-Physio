"use client";

import { Fragment, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { WorkflowRunRecord } from "@/lib/automation-types";
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

function formatDuration(startedAt: string, finishedAt: string | null): string {
  if (!finishedAt) {
    return "—";
  }

  const started = new Date(startedAt).getTime();
  const finished = new Date(finishedAt).getTime();
  if (Number.isNaN(started) || Number.isNaN(finished)) {
    return "—";
  }

  const seconds = Math.max(0, Math.round((finished - started) / 1000));
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m ${remainder}s`;
}

function statusClass(status: WorkflowRunRecord["status"]): string {
  if (status === "SUCCESS") {
    return "automation-status-pill automation-status-pill-success";
  }
  if (status === "FAILED") {
    return "automation-status-pill automation-status-pill-failed";
  }
  return "automation-status-pill automation-status-pill-running";
}

export type WorkflowRunTableProps = {
  runs: WorkflowRunRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isBusy?: boolean;
  onPageChange: (page: number) => void;
};

export function WorkflowRunTable({
  runs,
  pagination,
  isBusy = false,
  onPageChange,
}: WorkflowRunTableProps) {
  const [expandedRunId, setExpandedRunId] = useState<string | null>(null);
  const totalPages = Math.max(1, pagination.totalPages || 1);

  return (
    <>
      <DataTable
        columns={["Timestamp", "Workflow", "Status", "Duration", "Error", "Details"]}
        grid="default"
        emptyMessage="No workflow runs found."
        isEmpty={runs.length === 0}
      >
        {runs.map((run) => (
          <Fragment key={run.id}>
            <Row>
              <div>{formatDateTime(run.startedAt)}</div>
              <div>
                <div>{run.workflowName ?? "Built-in workflow"}</div>
                <Badge variant="secondary">{run.trigger}</Badge>
              </div>
              <div>
                <span className={cn(statusClass(run.status))}>{run.status}</span>
              </div>
              <div>{formatDuration(run.startedAt, run.finishedAt)}</div>
              <div className="automation-run-error">{run.errorMessage ?? "—"}</div>
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedRunId((current) => (current === run.id ? null : run.id))}
                >
                  {expandedRunId === run.id ? "Hide" : "View"}
                </Button>
              </div>
            </Row>
            {expandedRunId === run.id ? (
              <div className="automation-run-details">
                <div>
                  <h4>Input context</h4>
                  <pre>{JSON.stringify(run.inputContext, null, 2)}</pre>
                </div>
                <div>
                  <h4>Actions executed</h4>
                  <pre>{JSON.stringify(run.actionsExecuted, null, 2)}</pre>
                </div>
              </div>
            ) : null}
          </Fragment>
        ))}
      </DataTable>

      <div className="automation-pagination">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isBusy || pagination.page <= 1}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </Button>
        <span className="dashboard-cell-muted">
          Page {pagination.page} of {totalPages}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isBusy || pagination.page >= totalPages}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
