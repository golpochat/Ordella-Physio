"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrainingLossChart } from "@/components/ai/training/TrainingLossChart";
import { useTrainingExperiment } from "@/hooks/useTrainingPortal";
import { ADMIN_AI_BASE } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";

export type ExperimentDetailsProps = {
  experimentId: string;
  basePath?: string;
};

export function ExperimentDetails({ experimentId, basePath = ADMIN_AI_BASE }: ExperimentDetailsProps) {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.training.manage");
  const experimentQuery = useTrainingExperiment(experimentId);
  const [label, setLabel] = useState("");

  const experiment = experimentQuery.data;

  if (!experiment) {
    return <p className="dashboard-cell-muted">Loading experiment…</p>;
  }

  return (
    <div className="experiment-details">
      <header className="training-model-details-header">
        <div>
          <h2>{experiment.experimentName}</h2>
          <p className="dashboard-cell-muted">Job {experiment.trainingJobId.slice(0, 12)}…</p>
        </div>
        <Badge variant="secondary">{experiment.status}</Badge>
      </header>

      <dl className="training-details-grid">
        <div>
          <dt>Label</dt>
          <dd>{experiment.label ?? "—"}</dd>
        </div>
        <div>
          <dt>Started</dt>
          <dd>{new Date(experiment.startedAt).toLocaleString()}</dd>
        </div>
        <div>
          <dt>Finished</dt>
          <dd>{experiment.finishedAt ? new Date(experiment.finishedAt).toLocaleString() : "—"}</dd>
        </div>
      </dl>

      <pre className="dataset-json-preview">
        {JSON.stringify(experiment.hyperparameters, null, 2)}
      </pre>

      <TrainingLossChart data={experiment.trainingCurve} />

      <div className="automation-builder-actions">
        <Button asChild variant="secondary">
          <Link href={`${basePath}/experiments/compare?jobId=${experiment.trainingJobId}&ids=${experiment.id}`}>
            Compare
          </Link>
        </Button>
      </div>

      {canManage ? (
        <div className="dataset-form-field">
          <label className="automation-form-section-title" htmlFor="experiment-label">
            Label experiment
          </label>
          <input
            id="experiment-label"
            className="automation-select"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="best, baseline…"
          />
          <Button
            type="button"
            className="mt-2"
            onClick={() => toast.message("Use training job experiments page to persist labels.")}
          >
            Save label
          </Button>
        </div>
      ) : null}
    </div>
  );
}
