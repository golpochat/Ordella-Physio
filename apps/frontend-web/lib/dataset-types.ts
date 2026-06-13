export type DatasetType = "TEXT" | "JSON" | "CONVERSATION" | "EMBEDDING";

export type DatasetLabelType = "CLASSIFICATION" | "EXTRACTION" | "CORRECTION";

export type DatasetRecord = {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  type: DatasetType;
  tags: string[];
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
  latestVersionNumber?: number;
  recordCount?: number;
};

export type DatasetAuditLog = {
  id: string;
  datasetId: string;
  action: string;
  userId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type DatasetDetail = DatasetRecord & {
  auditLogs: DatasetAuditLog[];
};

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

export type DatasetLabelRecord = {
  id: string;
  tenantId: string;
  recordId: string;
  labelType: DatasetLabelType;
  labelValue: Record<string, unknown>;
  createdByUserId: string;
  createdAt: string;
};

export type DatasetRecordItem = {
  id: string;
  tenantId: string;
  datasetId: string;
  versionId: string;
  input: unknown;
  output: unknown | null;
  metadata: Record<string, unknown>;
  embedding: number[] | null;
  createdAt: string;
  labels: DatasetLabelRecord[];
};

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

export type DatasetExportPayload = {
  dataset: DatasetRecord;
  version: DatasetVersionRecord | null;
  records: DatasetRecordItem[];
  exportedAt: string;
};

export type CreateDatasetInput = {
  name: string;
  description?: string;
  type: DatasetType;
  tags?: string[];
  records?: Array<{
    input: unknown;
    output?: unknown;
    metadata?: Record<string, unknown>;
  }>;
};

export type UpdateDatasetInput = {
  name?: string;
  description?: string;
  tags?: string[];
};

export type DatasetEmbedResult = {
  versionId: string;
  embedded: number;
  embeddingModel: string;
  dimensions: number[] | null;
};
