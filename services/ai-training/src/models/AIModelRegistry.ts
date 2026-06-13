import type { AIModelRegistry } from "@/generated/prisma";

export type ModelRegistryStatus = "DRAFT" | "PUBLISHED" | "DEPRECATED";

export type ModelRegistryRecord = {
  id: string;
  tenantId: string;
  modelName: string;
  version: string;
  baseModel: string;
  trainingJobId: string;
  trainingProvider: string;
  fileLocation: string;
  metadata: Record<string, unknown>;
  status: ModelRegistryStatus;
  createdAt: string;
};

export function toModelRegistryRecord(model: AIModelRegistry): ModelRegistryRecord {
  return {
    id: model.id,
    tenantId: model.tenantId,
    modelName: model.modelName,
    version: model.version,
    baseModel: model.baseModel,
    trainingJobId: model.trainingJobId,
    trainingProvider: model.trainingProvider,
    fileLocation: model.fileLocation,
    metadata:
      model.metadata && typeof model.metadata === "object"
        ? (model.metadata as Record<string, unknown>)
        : {},
    status: model.status as ModelRegistryStatus,
    createdAt: model.createdAt.toISOString(),
  };
}
