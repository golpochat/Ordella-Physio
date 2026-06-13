export type AuditAction = "INFERENCE" | "TRAINING" | "DEPLOYMENT" | "DATASET" | "MODEL_ACCESS";

export type AuditLogRecord = {
  id: string;
  tenantId: string;
  userId: string | null;
  apiKeyId: string | null;
  action: AuditAction;
  modelId: string | null;
  requestMetadata: Record<string, unknown>;
  responseMetadata: Record<string, unknown>;
  timestamp: string;
  piiDetected: boolean;
  redacted: boolean;
};

export function toAuditLogRecord(row: {
  id: string;
  tenantId: string;
  userId: string | null;
  apiKeyId: string | null;
  action: string;
  modelId: string | null;
  requestMetadata: unknown;
  responseMetadata: unknown;
  timestamp: Date;
  piiDetected: boolean;
  redacted: boolean;
}): AuditLogRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    userId: row.userId,
    apiKeyId: row.apiKeyId,
    action: row.action as AuditAction,
    modelId: row.modelId,
    requestMetadata: (row.requestMetadata as Record<string, unknown>) ?? {},
    responseMetadata: (row.responseMetadata as Record<string, unknown>) ?? {},
    timestamp: row.timestamp.toISOString(),
    piiDetected: row.piiDetected,
    redacted: row.redacted,
  };
}
