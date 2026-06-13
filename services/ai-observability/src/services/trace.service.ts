import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import type { Prisma } from "@/generated/prisma";
import type { TraceService as TraceServiceName, TraceSpanRecord } from "@/models/AITraceSpan";
import { ObservabilityRepository } from "@/repositories/observability.repository";

@Injectable()
export class TraceSpanService {
  constructor(private readonly repository: ObservabilityRepository) {}

  async startSpan(input: {
    tenantId: string;
    traceId?: string;
    parentSpanId?: string;
    service: TraceServiceName;
    operation: string;
    metadata?: Record<string, unknown>;
  }) {
    const traceId = input.traceId ?? randomUUID();
    const spanId = randomUUID();
    const span = await this.repository.createTraceSpan({
      traceId,
      spanId,
      parentSpanId: input.parentSpanId,
      tenantId: input.tenantId,
      service: input.service,
      operation: input.operation,
      startTime: new Date(),
      metadata: (input.metadata ?? {}) as Prisma.InputJsonValue,
      status: "OK",
    });
    return { traceId, spanId, span: this.repository.mapTraceSpan(span) };
  }

  async endSpan(input: {
    tenantId: string;
    spanId: string;
    status?: "OK" | "ERROR";
    metadata?: Record<string, unknown>;
  }) {
    const endTime = new Date();
    const current = await this.repository.findSpanBySpanId(input.spanId, input.tenantId);
    const startTime = current?.startTime ?? endTime;
    const durationMs = Math.max(0, endTime.getTime() - startTime.getTime());

    await this.repository.updateTraceSpan(input.spanId, input.tenantId, {
      endTime,
      durationMs,
      status: input.status ?? "OK",
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    });

    return { spanId: input.spanId, durationMs, status: input.status ?? "OK" };
  }

  async linkSpansAcrossServices(input: {
    tenantId: string;
    traceId: string;
    spans: Array<{
      spanId: string;
      parentSpanId?: string;
      service: TraceServiceName;
      operation: string;
      durationMs: number;
      status?: "OK" | "ERROR";
      metadata?: Record<string, unknown>;
    }>;
  }) {
    const created: TraceSpanRecord[] = [];
    for (const span of input.spans) {
      const startTime = new Date(Date.now() - span.durationMs);
      const row = await this.repository.createTraceSpan({
        traceId: input.traceId,
        spanId: span.spanId,
        parentSpanId: span.parentSpanId,
        tenantId: input.tenantId,
        service: span.service,
        operation: span.operation,
        startTime,
        endTime: new Date(),
        durationMs: span.durationMs,
        status: span.status ?? "OK",
        metadata: (span.metadata ?? {}) as Prisma.InputJsonValue,
      });
      created.push(this.repository.mapTraceSpan(row));
    }
    return created;
  }

  async getTrace(traceId: string, tenantId: string) {
    const spans = await this.repository.getTraceSpans(traceId, tenantId);
    const records = spans.map((s) => this.repository.mapTraceSpan(s));
    const root = records.find((s) => !s.parentSpanId) ?? records[0];
    return {
      traceId,
      status: records.some((s) => s.status === "ERROR") ? "ERROR" : "OK",
      durationMs: records.reduce((sum, s) => sum + (s.durationMs ?? 0), 0),
      service: root?.service ?? "gateway",
      spans: records,
      waterfall: records.map((s) => ({
        spanId: s.spanId,
        operation: s.operation,
        service: s.service,
        startOffsetMs: 0,
        durationMs: s.durationMs ?? 0,
        status: s.status,
      })),
    };
  }

  async searchTraces(tenantId: string, filters: {
    service?: TraceServiceName;
    status?: "OK" | "ERROR";
    since?: Date;
    limit?: number;
  }) {
    const rows = await this.repository.searchTraces(tenantId, filters);
    return rows.map((r) => this.repository.mapTraceSpan(r));
  }
}
