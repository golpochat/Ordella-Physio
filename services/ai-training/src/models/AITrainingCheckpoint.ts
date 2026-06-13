import type { AITrainingCheckpoint } from "@/generated/prisma";

export type CheckpointRecord = {
  id: string;
  tenantId: string;
  trainingJobId: string;
  experimentId: string | null;
  checkpointNumber: number;
  fileLocation: string;
  metricsSnapshot: Record<string, unknown>;
  createdAt: string;
};

export function toCheckpointRecord(checkpoint: AITrainingCheckpoint): CheckpointRecord {
  return {
    id: checkpoint.id,
    tenantId: checkpoint.tenantId,
    trainingJobId: checkpoint.trainingJobId,
    experimentId: checkpoint.experimentId,
    checkpointNumber: checkpoint.checkpointNumber,
    fileLocation: checkpoint.fileLocation,
    metricsSnapshot:
      checkpoint.metricsSnapshot && typeof checkpoint.metricsSnapshot === "object"
        ? (checkpoint.metricsSnapshot as Record<string, unknown>)
        : {},
    createdAt: checkpoint.createdAt.toISOString(),
  };
}
