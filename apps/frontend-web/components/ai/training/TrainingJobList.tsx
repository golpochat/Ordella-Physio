"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { TrainingJobRecord } from "@/lib/training-types";
import { CLINIC_AI_BASE } from "@/lib/ai-admin-paths";

function formatDateTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function statusClass(status: TrainingJobRecord["status"]): string {
  if (status === "COMPLETED") return "training-status-pill training-status-success";
  if (status === "FAILED") return "training-status-pill training-status-failed";
  if (status === "RUNNING") return "training-status-pill training-status-running";
  return "training-status-pill";
}

export type TrainingJobListProps = {
  jobs: TrainingJobRecord[];
  basePath?: string;
};

export function TrainingJobList({ jobs, basePath = CLINIC_AI_BASE }: TrainingJobListProps) {
  return (
    <DataTable
      columns={["Job ID", "Dataset", "Model", "Provider", "Status", "Created", "Actions"]}
      grid="default"
      emptyMessage="No training jobs yet."
      isEmpty={jobs.length === 0}
    >
      {jobs.map((job) => (
        <Row key={job.id}>
          <div className="dataset-list-name">{job.id.slice(0, 8)}…</div>
          <div>{job.datasetId.slice(0, 8)}…</div>
          <div>
            <Badge variant="secondary">{job.modelType}</Badge>
            <div className="dashboard-cell-muted">{job.baseModel}</div>
          </div>
          <div>{job.trainingProvider}</div>
          <div>
            <span className={statusClass(job.status)}>{job.status}</span>
          </div>
          <div>{formatDateTime(job.createdAt)}</div>
          <div>
            <Link href={`${basePath}/training/${job.id}`} className="dashboard-link">
              View details
            </Link>
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
