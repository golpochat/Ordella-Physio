import type { AIDatasetVersion } from "@/generated/prisma";

export type DatasetVersionRecord = {
  id: string;
  tenantId: string;
  datasetId: string;
  versionNumber: number;
  recordCount: number;
  embeddingModel: string | null;
  createdByUserId: string;
  createdAt: string;
};

export function toDatasetVersionRecord(version: AIDatasetVersion): DatasetVersionRecord {
  return {
    id: version.id,
    tenantId: version.tenantId,
    datasetId: version.datasetId,
    versionNumber: version.versionNumber,
    recordCount: version.recordCount,
    embeddingModel: version.embeddingModel,
    createdByUserId: version.createdByUserId,
    createdAt: version.createdAt.toISOString(),
  };
}

export type DatasetVersionDiffResult = {
  datasetId: string;
  fromVersion: number;
  toVersion: number;
  addedRecords: number;
  removedRecords: number;
  changedRecords: number;
  details: Array<{
    type: "added" | "removed" | "changed";
    recordId?: string;
    input?: unknown;
    previousInput?: unknown;
  }>;
};
