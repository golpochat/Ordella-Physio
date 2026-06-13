import type { AITrainingExperiment } from "@/generated/prisma";

export type ExperimentStatus = "RUNNING" | "COMPLETED" | "FAILED";

export type TrainingCurvePoint = {
  epoch: number;
  loss: number;
  accuracy?: number;
  perplexity?: number;
};

export type ExperimentRecord = {
  id: string;
  tenantId: string;
  trainingJobId: string;
  experimentName: string;
  hyperparameters: Record<string, unknown>;
  metrics: Record<string, unknown>;
  trainingCurve: TrainingCurvePoint[];
  status: ExperimentStatus;
  label: string | null;
  startedAt: string;
  finishedAt: string | null;
  createdByUserId: string;
};

function parseJsonObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function parseCurve(value: unknown): TrainingCurvePoint[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (point): point is TrainingCurvePoint =>
      Boolean(point) &&
      typeof point === "object" &&
      typeof (point as TrainingCurvePoint).epoch === "number",
  );
}

export function toExperimentRecord(experiment: AITrainingExperiment): ExperimentRecord {
  return {
    id: experiment.id,
    tenantId: experiment.tenantId,
    trainingJobId: experiment.trainingJobId,
    experimentName: experiment.experimentName,
    hyperparameters: parseJsonObject(experiment.hyperparameters),
    metrics: parseJsonObject(experiment.metrics),
    trainingCurve: parseCurve(experiment.trainingCurve),
    status: experiment.status as ExperimentStatus,
    label: experiment.label,
    startedAt: experiment.startedAt.toISOString(),
    finishedAt: experiment.finishedAt?.toISOString() ?? null,
    createdByUserId: experiment.createdByUserId,
  };
}
