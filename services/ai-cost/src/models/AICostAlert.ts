export type CostAlertType = "BUDGET_SOFT" | "BUDGET_HARD" | "ANOMALY";
export type CostAlertSeverity = "INFO" | "WARNING" | "CRITICAL";

export type CostAlertRecord = {
  id: string;
  tenantId: string;
  type: CostAlertType;
  severity: CostAlertSeverity;
  message: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  resolvedAt: string | null;
};

export function toCostAlertRecord(row: {
  id: string;
  tenantId: string;
  type: string;
  severity: string;
  message: string;
  metadata: unknown;
  createdAt: Date;
  resolvedAt: Date | null;
}): CostAlertRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    type: row.type as CostAlertType,
    severity: row.severity as CostAlertSeverity,
    message: row.message,
    metadata: (row.metadata as Record<string, unknown>) ?? {},
    createdAt: row.createdAt.toISOString(),
    resolvedAt: row.resolvedAt?.toISOString() ?? null,
  };
}
