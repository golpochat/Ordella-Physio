import type { AIDriftEvent } from "@/generated/prisma";

export type DriftType = "DATA" | "CONCEPT" | "EMBEDDING" | "PERFORMANCE";
export type DriftSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type DriftEventRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  driftType: DriftType;
  severity: DriftSeverity;
  metrics: Record<string, unknown>;
  summary: string;
  recommendedActions: string[];
  detectedAt: string;
  resolvedAt: string | null;
  mitigationAction: string | null;
};

export function toDriftEventRecord(event: AIDriftEvent): DriftEventRecord {
  return {
    id: event.id,
    tenantId: event.tenantId,
    modelId: event.modelId,
    driftType: event.driftType as DriftType,
    severity: event.severity as DriftSeverity,
    metrics:
      event.metrics && typeof event.metrics === "object"
        ? (event.metrics as Record<string, unknown>)
        : {},
    summary: event.summary,
    recommendedActions: Array.isArray(event.recommendedActions)
      ? (event.recommendedActions as string[])
      : [],
    detectedAt: event.detectedAt.toISOString(),
    resolvedAt: event.resolvedAt?.toISOString() ?? null,
    mitigationAction: event.mitigationAction,
  };
}
