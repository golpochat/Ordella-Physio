"use client";

import { Badge } from "@/components/ui/badge";
import type { AIModelDeploymentRecord } from "@/lib/training-types";

export type DeploymentStatusCardProps = {
  deployment: AIModelDeploymentRecord | null;
  failoverActive?: boolean;
  failoverRegion?: string | null;
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  ACTIVE: "default",
  DEPLOYING: "secondary",
  FAILED: "destructive",
  ROLLED_BACK: "destructive",
};

export function DeploymentStatusCard({ deployment, failoverActive, failoverRegion }: DeploymentStatusCardProps) {
  if (!deployment) {
    return <p className="dashboard-cell-muted">No deployment yet. Start a deployment to serve this model in multiple regions.</p>;
  }

  return (
    <section className="training-deployment-status-card">
      <div className="training-model-details-header">
        <div>
          <h3>Deployment {deployment.version}</h3>
          <p className="dashboard-cell-muted">Artifact: {deployment.artifactLocation || "Packaging…"}</p>
        </div>
        <Badge variant={STATUS_VARIANT[deployment.status] ?? "secondary"}>{deployment.status}</Badge>
      </div>
      {failoverActive ? (
        <p className="training-deployment-failover-warning">
          Failover active → routing to <strong>{failoverRegion}</strong>
        </p>
      ) : null}
      {deployment.pipeline.length ? (
        <ul className="training-deployment-pipeline">
          {deployment.pipeline.map((step) => (
            <li key={step.name}>
              <span>{step.name}</span>
              <Badge variant="secondary">{step.status}</Badge>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
