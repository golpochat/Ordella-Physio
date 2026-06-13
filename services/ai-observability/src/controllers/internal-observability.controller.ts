import { Body, Controller, ForbiddenException, Headers, Post } from "@nestjs/common";
import type { LogService } from "@/models/AILogEvent";
import type { MetricType } from "@/models/AIMetricPoint";
import type { TraceService } from "@/models/AITraceSpan";
import { LoggingService } from "@/services/logging.service";
import { MetricsService } from "@/services/metrics.service";
import { TraceSpanService } from "@/services/trace.service";

@Controller("observability/internal")
export class InternalObservabilityController {
  constructor(
    private readonly traceService: TraceSpanService,
    private readonly loggingService: LoggingService,
    private readonly metricsService: MetricsService,
  ) {}

  private assertInternal(service: string, tenantId: string) {
    if (!service || !tenantId) throw new ForbiddenException("Internal service headers required.");
  }

  @Post("span/start")
  startSpan(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body()
    body: {
      traceId?: string;
      parentSpanId?: string;
      service: TraceService;
      operation: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    this.assertInternal(service, tenantId);
    return this.traceService.startSpan({ tenantId, ...body });
  }

  @Post("span/end")
  endSpan(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body()
    body: {
      spanId: string;
      status?: "OK" | "ERROR";
      metadata?: Record<string, unknown>;
    },
  ) {
    this.assertInternal(service, tenantId);
    return this.traceService.endSpan({ tenantId, ...body });
  }

  @Post("span/link")
  linkSpans(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body()
    body: {
      traceId: string;
      spans: Array<{
        spanId: string;
        parentSpanId?: string;
        service: TraceService;
        operation: string;
        durationMs: number;
        status?: "OK" | "ERROR";
        metadata?: Record<string, unknown>;
      }>;
    },
  ) {
    this.assertInternal(service, tenantId);
    return this.traceService.linkSpansAcrossServices({ tenantId, ...body });
  }

  @Post("log")
  recordLog(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body()
    body: {
      level: "INFO" | "WARN" | "ERROR";
      service: LogService;
      message: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    this.assertInternal(service, tenantId);
    if (body.level === "WARN") return this.loggingService.logWarn(tenantId, body.service, body.message, body.metadata);
    if (body.level === "ERROR") return this.loggingService.logError(tenantId, body.service, body.message, body.metadata);
    return this.loggingService.logInfo(tenantId, body.service, body.message, body.metadata);
  }

  @Post("metric")
  recordMetric(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body()
    body: {
      modelId?: string;
      region?: string;
      metricType: MetricType;
      value: number;
    },
  ) {
    this.assertInternal(service, tenantId);
    return this.metricsService.recordMetric({ tenantId, ...body });
  }

  @Post("batch")
  async recordBatch(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body()
    body: {
      trace?: {
        traceId?: string;
        service: TraceService;
        operation: string;
        durationMs: number;
        status?: "OK" | "ERROR";
        metadata?: Record<string, unknown>;
      };
      log?: {
        level: "INFO" | "WARN" | "ERROR";
        service: LogService;
        message: string;
        metadata?: Record<string, unknown>;
      };
      metrics?: Array<{
        modelId?: string;
        region?: string;
        metricType: MetricType;
        value: number;
      }>;
    },
  ) {
    this.assertInternal(service, tenantId);
    const results: Record<string, unknown> = {};

    if (body.trace) {
      const started = await this.traceService.startSpan({
        tenantId,
        service: body.trace.service,
        operation: body.trace.operation,
        traceId: body.trace.traceId,
        metadata: body.trace.metadata,
      });
      await this.traceService.endSpan({
        tenantId,
        spanId: started.spanId,
        status: body.trace.status,
        metadata: body.trace.metadata,
      });
      results.trace = started;
    }

    if (body.log) {
      const log = body.log;
      if (log.level === "WARN") results.log = await this.loggingService.logWarn(tenantId, log.service, log.message, log.metadata);
      else if (log.level === "ERROR") results.log = await this.loggingService.logError(tenantId, log.service, log.message, log.metadata);
      else results.log = await this.loggingService.logInfo(tenantId, log.service, log.message, log.metadata);
    }

    if (body.metrics?.length) {
      results.metrics = await Promise.all(
        body.metrics.map((m) => this.metricsService.recordMetric({ tenantId, ...m })),
      );
    }

    return results;
  }
}
