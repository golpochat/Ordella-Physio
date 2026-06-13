export type ExperimentStatus = "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED";

export type ExperimentVariant = {
  key: string;
  weight: number;
  modelId?: string;
  uiComponent?: string;
  value?: unknown;
};

export type ExperimentRecord = {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  variants: ExperimentVariant[];
  targetAudience: Record<string, unknown>;
  status: ExperimentStatus;
  metricsTracked: string[];
  experimentType: string;
  modelKey: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ExperimentAssignmentRecord = {
  id: string;
  experimentId: string;
  tenantId: string;
  userId: string | null;
  variant: string;
  assignedAt: string;
};

export type ExperimentEventRecord = {
  id: string;
  experimentId: string;
  tenantId: string;
  userId: string | null;
  variant: string;
  eventType: string;
  payload: Record<string, unknown>;
  recordedAt: string;
};

export function toExperimentRecord(row: {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  variants: unknown;
  targetAudience: unknown;
  status: string;
  metricsTracked: unknown;
  experimentType: string;
  modelKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}): ExperimentRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    name: row.name,
    description: row.description,
    variants: Array.isArray(row.variants) ? (row.variants as ExperimentVariant[]) : [],
    targetAudience: (row.targetAudience as Record<string, unknown>) ?? {},
    status: row.status as ExperimentStatus,
    metricsTracked: Array.isArray(row.metricsTracked) ? (row.metricsTracked as string[]) : [],
    experimentType: row.experimentType,
    modelKey: row.modelKey,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function toAssignmentRecord(row: {
  id: string;
  experimentId: string;
  tenantId: string;
  userId: string | null;
  variant: string;
  assignedAt: Date;
}): ExperimentAssignmentRecord {
  return {
    id: row.id,
    experimentId: row.experimentId,
    tenantId: row.tenantId,
    userId: row.userId,
    variant: row.variant,
    assignedAt: row.assignedAt.toISOString(),
  };
}
