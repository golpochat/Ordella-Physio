"use client";

import Link from "next/link";
import { useState } from "react";
import { TrainingJobLogs } from "@/components/ai/training/TrainingJobLogs";
import { TrainingMetrics } from "@/components/ai/training/TrainingMetrics";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrainingJob, useTrainingMetrics } from "@/hooks/useTrainingPortal";
import { WithPermission } from "@/lib/auth/withPermission";

type TrainingJobDetailPageProps = {
  params: { id: string };
};

type TabId = "overview" | "logs" | "metrics" | "output";

export default function TrainingJobDetailPage({ params }: TrainingJobDetailPageProps) {
  const jobId = params.id;
  const [tab, setTab] = useState<TabId>("overview");
  const jobQuery = useTrainingJob(jobId);
  const metricsQuery = useTrainingMetrics(jobId);
  const job = jobQuery.data;

  return (
    <WithPermission permission="ai.training.view">
      <ListPage
        title={job ? `Training job ${job.id.slice(0, 8)}…` : "Training job"}
        subtitle="Monitor preprocessing, provider training, logs, and output model."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href="/clinic/ai/training">&larr; All jobs</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/training/${jobId}/dashboard`}>Dashboard</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/training/${jobId}/experiments`}>Experiments</Link>
            </Button>
          </div>
        }
        isLoading={jobQuery.isLoading}
        isError={jobQuery.isError}
        onRetry={() => void jobQuery.refetch()}
        loadingRows={4}
      >
        <div className="training-tabs">
          {(["overview", "logs", "metrics", "output"] as TabId[]).map((entry) => (
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

        {tab === "overview" && job ? (
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
                <div>
                  <dt>Dataset</dt>
                  <dd>{job.datasetId}</dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd>{job.datasetVersionId}</dd>
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
        ) : null}

        {tab === "logs" && job ? <TrainingJobLogs jobId={jobId} initialLogs={job.logs} /> : null}

        {tab === "metrics" ? (
          <TrainingMetrics metrics={metricsQuery.data} isLoading={metricsQuery.isFetching} />
        ) : null}

        {tab === "output" && job?.outputModelId ? (
          <Card>
            <CardBody>
              <Link href={`/clinic/ai/models/${job.outputModelId}`} className="dashboard-link">
                View registered model
              </Link>
            </CardBody>
          </Card>
        ) : null}

        {tab === "output" && job && !job.outputModelId ? (
          <p className="dataset-empty-hint">Output model not registered yet.</p>
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
