"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckpointList } from "@/components/ai/training/CheckpointList";
import { ExperimentList } from "@/components/ai/training/ExperimentList";
import { TrainingJobLogs } from "@/components/ai/training/TrainingJobLogs";
import { TrainingMetrics } from "@/components/ai/training/TrainingMetrics";
import { TrainingMetricsChart } from "@/components/ai/training/TrainingMetricsChart";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useTrainingDashboard,
  useTrainingExperiments,
  useTrainingJob,
  useTrainingMetrics,
} from "@/hooks/useTrainingPortal";
import { ADMIN_AI_BASE, adminAiPaths } from "@/lib/ai-admin-paths";
import type { TrainingJobRecord } from "@/lib/training-types";

type TabId = "overview" | "logs" | "metrics" | "checkpoints" | "experiments";

export type TrainingJobDetailsProps = {
  jobId: string;
  basePath?: string;
};

export function TrainingJobDetails({ jobId, basePath = ADMIN_AI_BASE }: TrainingJobDetailsProps) {
  const [tab, setTab] = useState<TabId>("overview");
  const jobQuery = useTrainingJob(jobId);
  const metricsQuery = useTrainingMetrics(jobId);
  const dashboardQuery = useTrainingDashboard(jobId);
  const experimentsQuery = useTrainingExperiments(jobId);
  const job = jobQuery.data;

  return (
    <div className="training-job-details">
      <div className="automation-builder-actions">
        <Link href={`${basePath}/training/${jobId}/dashboard`} className="dashboard-link">
          Live dashboard
        </Link>
      </div>

      <div className="training-tabs">
        {(["overview", "logs", "metrics", "checkpoints", "experiments"] as TabId[]).map((entry) => (
          <button
            key={entry}
            type="button"
            className={`training-tab ${tab === entry ? "training-tab-active" : ""}`}
            onClick={() => setTab(entry)}
          >
            {entry.charAt(0).toUpperCase() + entry.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && job ? <OverviewPanel job={job} /> : null}
      {tab === "logs" && job ? <TrainingJobLogs jobId={jobId} initialLogs={job.logs} /> : null}
      {tab === "metrics" ? (
        <div className="training-dashboard-charts">
          <TrainingMetrics metrics={metricsQuery.data} isLoading={metricsQuery.isFetching} />
          <TrainingMetricsChart data={dashboardQuery.data?.trainingCurve ?? []} />
        </div>
      ) : null}
      {tab === "checkpoints" && dashboardQuery.data ? (
        <CheckpointList checkpoints={dashboardQuery.data.checkpoints} />
      ) : null}
      {tab === "experiments" ? (
        <ExperimentList
          jobId={jobId}
          experiments={experimentsQuery.data ?? []}
          basePath={basePath}
        />
      ) : null}
    </div>
  );
}

function OverviewPanel({ job }: { job: TrainingJobRecord }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardBody>
        <dl className="training-details-grid">
          <div>
            <dt>Status</dt>
            <dd>{job.status}</dd>
          </div>
          <div>
            <dt>Model type</dt>
            <dd>{job.modelType}</dd>
          </div>
          <div>
            <dt>Base model</dt>
            <dd>{job.baseModel}</dd>
          </div>
          <div>
            <dt>Provider</dt>
            <dd>{job.trainingProvider}</dd>
          </div>
        </dl>
        <pre className="dataset-json-preview">
          {JSON.stringify(
            { hyperparameters: job.hyperparameters, trainingConfig: job.trainingConfig },
            null,
            2,
          )}
        </pre>
      </CardBody>
    </Card>
  );
}
