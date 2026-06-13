import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { toLogEventRecord } from "@/models/AILogEvent";
import { toMetricPointRecord } from "@/models/AIMetricPoint";
import { toTraceSpanRecord } from "@/models/AITraceSpan";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class ObservabilityRepository {
  constructor(private readonly db: DatabaseService) {}

  createTraceSpan(data: {
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    tenantId: string;
    service: string;
    operation: string;
    startTime?: Date;
    endTime?: Date;
    durationMs?: number;
    metadata?: Prisma.InputJsonValue;
    status?: string;
  }) {
    return this.db.aITraceSpan.create({ data });
  }

  updateTraceSpan(spanId: string, tenantId: string, data: {
    endTime?: Date;
    durationMs?: number;
    status?: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.aITraceSpan.updateMany({
      where: { spanId, tenantId },
      data,
    });
  }

  findSpanBySpanId(spanId: string, tenantId: string) {
    return this.db.aITraceSpan.findFirst({ where: { spanId, tenantId } });
  }

  getTraceSpans(traceId: string, tenantId: string) {
    return this.db.aITraceSpan.findMany({
      where: { traceId, tenantId },
      orderBy: { startTime: "asc" },
    });
  }

  searchTraces(tenantId: string, filters: {
    service?: string;
    status?: string;
    since?: Date;
    limit?: number;
  }) {
    return this.db.aITraceSpan.findMany({
      where: {
        tenantId,
        parentSpanId: null,
        ...(filters.service ? { service: filters.service } : {}),
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.since ? { startTime: { gte: filters.since } } : {}),
      },
      orderBy: { startTime: "desc" },
      take: filters.limit ?? 200,
    });
  }

  createLogEvent(data: {
    tenantId: string;
    service: string;
    level: string;
    message: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.aILogEvent.create({ data });
  }

  searchLogs(tenantId: string, filters: {
    service?: string;
    level?: string;
    since?: Date;
    limit?: number;
  }) {
    return this.db.aILogEvent.findMany({
      where: {
        tenantId,
        ...(filters.service ? { service: filters.service } : {}),
        ...(filters.level ? { level: filters.level } : {}),
        ...(filters.since ? { timestamp: { gte: filters.since } } : {}),
      },
      orderBy: { timestamp: "desc" },
      take: filters.limit ?? 500,
    });
  }

  createMetricPoint(data: {
    tenantId: string;
    modelId?: string;
    region?: string;
    metricType: string;
    value: number;
  }) {
    return this.db.aIMetricPoint.create({ data });
  }

  listMetrics(tenantId: string, filters: {
    metricType?: string;
    modelId?: string;
    region?: string;
    since?: Date;
    limit?: number;
  }) {
    return this.db.aIMetricPoint.findMany({
      where: {
        tenantId,
        ...(filters.metricType ? { metricType: filters.metricType } : {}),
        ...(filters.modelId ? { modelId: filters.modelId } : {}),
        ...(filters.region ? { region: filters.region } : {}),
        ...(filters.since ? { timestamp: { gte: filters.since } } : {}),
      },
      orderBy: { timestamp: "desc" },
      take: filters.limit ?? 1000,
    });
  }

  createBottleneckAlert(data: {
    tenantId: string;
    alertType: string;
    entity: string;
    severity: string;
    message: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.aIBottleneckAlert.create({ data });
  }

  listBottleneckAlerts(tenantId: string, unresolvedOnly = true) {
    return this.db.aIBottleneckAlert.findMany({
      where: { tenantId, ...(unresolvedOnly ? { resolvedAt: null } : {}) },
      orderBy: { detectedAt: "desc" },
      take: 100,
    });
  }

  resolveBottleneckAlert(id: string, tenantId: string) {
    return this.db.aIBottleneckAlert.updateMany({
      where: { id, tenantId },
      data: { resolvedAt: new Date() },
    });
  }

  mapTraceSpan(row: Awaited<ReturnType<ObservabilityRepository["createTraceSpan"]>>) {
    return toTraceSpanRecord(row);
  }

  mapLogEvent(row: Awaited<ReturnType<ObservabilityRepository["createLogEvent"]>>) {
    return toLogEventRecord(row);
  }

  mapMetricPoint(row: Awaited<ReturnType<ObservabilityRepository["createMetricPoint"]>>) {
    return toMetricPointRecord(row);
  }
}
