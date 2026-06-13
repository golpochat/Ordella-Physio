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

export type AccessPolicyRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  allowedRoles: string[];
  allowedUsers: string[] | null;
  createdAt: string;
  updatedAt: string;
};

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

export type ComplianceExport = {
  tenantId: string;
  soc2: Record<string, unknown>;
  iso27001: Record<string, unknown>;
  accessPolicies: { policies: AccessPolicyRecord[]; total: number };
  piiIncidents: { total: number; open: number; incidents: PIIIncidentRecord[] };
  modelUsage: { byModel: Record<string, number>; totalInferences: number };
  auditLogs: { count: number; logs: AuditLogRecord[] };
};
