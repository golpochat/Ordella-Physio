"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ModelRegistryRecord } from "@/lib/training-types";
import { CLINIC_AI_BASE } from "@/lib/ai-admin-paths";

export type ModelDetailsProps = {
  model: ModelRegistryRecord;
  canManage?: boolean;
  isBusy?: boolean;
  basePath?: string;
  onPublish?: () => void;
  onDeprecate?: () => void;
};

export function ModelDetails({
  model,
  canManage = false,
  isBusy = false,
  basePath = CLINIC_AI_BASE,
  onPublish,
  onDeprecate,
}: ModelDetailsProps) {
  return (
    <div className="training-model-details">
      <header className="training-model-details-header">
        <div>
          <h2>{model.modelName}</h2>
          <p className="dashboard-cell-muted">
            {model.version} · {model.baseModel} · {model.trainingProvider}
          </p>
        </div>
        <Badge variant={model.status === "PUBLISHED" ? "default" : "secondary"}>
          {model.status}
        </Badge>
      </header>

      <dl className="training-details-grid">
        <div>
          <dt>File location</dt>
          <dd>{model.fileLocation}</dd>
        </div>
        <div>
          <dt>Training job</dt>
          <dd>
            <Link href={`${basePath}/training/${model.trainingJobId}`} className="dashboard-link">
              {model.trainingJobId.slice(0, 12)}…
            </Link>
          </dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>{new Date(model.createdAt).toLocaleString()}</dd>
        </div>
      </dl>

      <pre className="dataset-json-preview">{JSON.stringify(model.metadata, null, 2)}</pre>

      <div className="automation-builder-actions">
        <Button asChild variant="secondary">
          <Link href={`${basePath}/models/${model.id}/evaluation`}>Evaluation</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`${basePath}/models/${model.id}/promotion`}>Promotion</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`${basePath}/models/${model.id}/deployment`}>Deployment</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`${basePath}/models/${model.id}/drift`}>Drift</Link>
        </Button>
      </div>

      {canManage ? (
        <div className="automation-builder-actions">
          {model.status !== "PUBLISHED" ? (
            <Button type="button" disabled={isBusy} onClick={onPublish}>
              Publish for inference
            </Button>
          ) : null}
          {model.status !== "DEPRECATED" ? (
            <Button type="button" variant="secondary" disabled={isBusy} onClick={onDeprecate}>
              Deprecate
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
