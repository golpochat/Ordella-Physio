"use client";

import { DriftSeverityBadge } from "@/components/ai/models/DriftSeverityBadge";
import type { DriftEventRecord, DriftType } from "@/lib/training-types";

export type DriftSummaryCardProps = {
  driftType: DriftType;
  event: DriftEventRecord | null;
};

const LABELS: Record<DriftType, string> = {
  DATA: "Data drift",
  CONCEPT: "Concept drift",
  EMBEDDING: "Embedding drift",
  PERFORMANCE: "Performance degradation",
};

export function DriftSummaryCard({ driftType, event }: DriftSummaryCardProps) {
  return (
    <div className="training-drift-summary-card">
      <div className="training-drift-summary-header">
        <h4>{LABELS[driftType]}</h4>
        <DriftSeverityBadge severity={event?.severity ?? null} />
      </div>
      <p className="dashboard-cell-muted">
        {event
          ? `Last detected ${new Date(event.detectedAt).toLocaleString()}`
          : "No drift detected recently"}
      </p>
      <p>{event?.recommendedActions[0] ?? "Continue monitoring inference logs."}</p>
    </div>
  );
}
