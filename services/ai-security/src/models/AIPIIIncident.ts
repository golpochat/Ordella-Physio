export type PIIType = "EMAIL" | "PHONE" | "ADDRESS" | "ID_NUMBER" | "GENERIC";

export type PIIIncidentRecord = {
  id: string;
  tenantId: string;
  modelId: string | null;
  piiType: PIIType;
  originalText: string;
  redactedText: string;
  detectedAt: string;
  resolvedAt: string | null;
};

export type PIIDetectionResult = {
  detected: boolean;
  types: PIIType[];
  matches: Array<{ type: PIIType; value: string; start: number; end: number }>;
};

export function toPIIIncidentRecord(row: {
  id: string;
  tenantId: string;
  modelId: string | null;
  piiType: string;
  originalText: string;
  redactedText: string;
  detectedAt: Date;
  resolvedAt: Date | null;
}): PIIIncidentRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    modelId: row.modelId,
    piiType: row.piiType as PIIType,
    originalText: row.originalText,
    redactedText: row.redactedText,
    detectedAt: row.detectedAt.toISOString(),
    resolvedAt: row.resolvedAt?.toISOString() ?? null,
  };
}
