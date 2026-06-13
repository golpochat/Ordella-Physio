import type { AITrainingJob } from "@/generated/prisma";

export type TrainingModelType = "LLM" | "EMBEDDING";
export type TrainingProvider = "OPENAI" | "AZURE" | "LOCAL";
export type TrainingJobStatus = "QUEUED" | "RUNNING" | "FAILED" | "COMPLETED";

export type TrainingLogEntry = {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
};

export type TrainingJobRecord = {
  id: string;
  tenantId: string;
  datasetId: string;
  datasetVersionId: string;
  modelType: TrainingModelType;
  baseModel: string;
  trainingProvider: TrainingProvider;
  status: TrainingJobStatus;
  hyperparameters: Record<string, unknown>;
  trainingConfig: Record<string, unknown>;
  logs: TrainingLogEntry[];
  metrics: Record<string, unknown>;
  providerJobId: string | null;
  trainingFileLocation: string | null;
  outputModelId: string | null;
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
};

function parseJsonObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function parseLogs(value: unknown): TrainingLogEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (entry): entry is TrainingLogEntry =>
      Boolean(entry) &&
      typeof entry === "object" &&
      typeof (entry as TrainingLogEntry).message === "string",
  );
}

export function toTrainingJobRecord(job: AITrainingJob): TrainingJobRecord {
  return {
    id: job.id,
    tenantId: job.tenantId,
    datasetId: job.datasetId,
    datasetVersionId: job.datasetVersionId,
    modelType: job.modelType as TrainingModelType,
    baseModel: job.baseModel,
    trainingProvider: job.trainingProvider as TrainingProvider,
    status: job.status as TrainingJobStatus,
    hyperparameters: parseJsonObject(job.hyperparameters),
    trainingConfig: parseJsonObject(job.trainingConfig),
    logs: parseLogs(job.logs),
    metrics: parseJsonObject(job.metrics),
    providerJobId: job.providerJobId,
    trainingFileLocation: job.trainingFileLocation,
    outputModelId: job.outputModelId,
    createdByUserId: job.createdByUserId,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}
