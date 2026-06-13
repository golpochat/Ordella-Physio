import type { AITraceSpan } from "@/generated/prisma";

export type TraceService = "gateway" | "inference" | "training" | "deployment" | "dataset";
export type TraceStatus = "OK" | "ERROR";

export type TraceSpanRecord = {
  id: string;
  traceId: string;
  spanId: string;
  parentSpanId: string | null;
  tenantId: string;
  service: TraceService;
  operation: string;
  startTime: string;
  endTime: string | null;
  durationMs: number | null;
  metadata: Record<string, unknown>;
  status: TraceStatus;
};

export function toTraceSpanRecord(span: AITraceSpan): TraceSpanRecord {
  return {
    id: span.id,
    traceId: span.traceId,
    spanId: span.spanId,
    parentSpanId: span.parentSpanId,
    tenantId: span.tenantId,
    service: span.service as TraceService,
    operation: span.operation,
    startTime: span.startTime.toISOString(),
    endTime: span.endTime?.toISOString() ?? null,
    durationMs: span.durationMs,
    metadata:
      span.metadata && typeof span.metadata === "object" && !Array.isArray(span.metadata)
        ? (span.metadata as Record<string, unknown>)
        : {},
    status: span.status as TraceStatus,
  };
}
