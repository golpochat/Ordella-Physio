import type { AIDataset, AIDatasetType } from "@/generated/prisma";

export type DatasetType = "TEXT" | "JSON" | "CONVERSATION" | "EMBEDDING";

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

export function toDatasetRecord(dataset: AIDataset, extras?: { latestVersionNumber?: number; recordCount?: number }): DatasetRecord {
  return {
    id: dataset.id,
    tenantId: dataset.tenantId,
    name: dataset.name,
    description: dataset.description,
    type: dataset.type as DatasetType,
    tags: dataset.tags,
    createdByUserId: dataset.createdByUserId,
    createdAt: dataset.createdAt.toISOString(),
    updatedAt: dataset.updatedAt.toISOString(),
    latestVersionNumber: extras?.latestVersionNumber,
    recordCount: extras?.recordCount,
  };
}

export function parseDatasetType(value: string): AIDatasetType {
  const normalized = value.trim().toUpperCase() as DatasetType;
  if (!["TEXT", "JSON", "CONVERSATION", "EMBEDDING"].includes(normalized)) {
    throw new Error("Invalid dataset type.");
  }
  return normalized as AIDatasetType;
}
