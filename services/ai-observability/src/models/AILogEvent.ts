import type { AILogEvent } from "@/generated/prisma";

export type LogLevel = "INFO" | "WARN" | "ERROR";
export type LogService = "gateway" | "inference" | "training" | "deployment" | "dataset";

export type LogEventRecord = {
  id: string;
  tenantId: string;
  service: LogService;
  level: LogLevel;
  message: string;
  metadata: Record<string, unknown>;
  timestamp: string;
};

export function toLogEventRecord(event: AILogEvent): LogEventRecord {
  return {
    id: event.id,
    tenantId: event.tenantId,
    service: event.service as LogService,
    level: event.level as LogLevel,
    message: event.message,
    metadata:
      event.metadata && typeof event.metadata === "object" && !Array.isArray(event.metadata)
        ? (event.metadata as Record<string, unknown>)
        : {},
    timestamp: event.timestamp.toISOString(),
  };
}
