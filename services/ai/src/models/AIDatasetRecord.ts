import type { AIDatasetLabel, AIDatasetRecord } from "@/generated/prisma";

export type DatasetLabelType = "CLASSIFICATION" | "EXTRACTION" | "CORRECTION";

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

export function toDatasetLabelRecord(label: AIDatasetLabel): DatasetLabelRecord {
  return {
    id: label.id,
    tenantId: label.tenantId,
    recordId: label.recordId,
    labelType: label.labelType as DatasetLabelType,
    labelValue:
      label.labelValue && typeof label.labelValue === "object"
        ? (label.labelValue as Record<string, unknown>)
        : {},
    createdByUserId: label.createdByUserId,
    createdAt: label.createdAt.toISOString(),
  };
}

export function toDatasetRecordItem(
  record: AIDatasetRecord,
  labels: AIDatasetLabel[] = [],
): DatasetRecordItem {
  return {
    id: record.id,
    tenantId: record.tenantId,
    datasetId: record.datasetId,
    versionId: record.versionId,
    input: record.input,
    output: record.output,
    metadata:
      record.metadata && typeof record.metadata === "object"
        ? (record.metadata as Record<string, unknown>)
        : {},
    embedding: Array.isArray(record.embedding) ? (record.embedding as number[]) : null,
    createdAt: record.createdAt.toISOString(),
    labels: labels.map(toDatasetLabelRecord),
  };
}

export function inputToText(input: unknown): string {
  if (typeof input === "string") {
    return input;
  }
  return JSON.stringify(input);
}
