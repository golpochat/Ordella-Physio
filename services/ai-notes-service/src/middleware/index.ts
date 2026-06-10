import {
  CorrelationIdMiddleware,
  RequestLoggerMiddleware,
  SanitizeMiddleware,
  createAuthContextMiddleware,
  createCorsMiddleware,
  createHelmetMiddleware,
  createRateLimitMiddleware,
  createTenantMiddleware,
} from "@ordella/middleware";
import {
  createMetricsRegistry,
  createRequestLoggingMiddleware,
  createRequestMetricsMiddleware,
  createRequestTracingMiddleware,
  setDefaultMetricsRegistry,
} from "@ordella/observability";
import type { MiddlewareConsumer } from "@nestjs/common";
import { RequestMethod } from "@nestjs/common";

const metricsRegistry = createMetricsRegistry({ serviceName: "ai-notes-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const AiNotesTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/ai/health"],
});

export const AiNotesAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/ai/health"],
});

export const AiNotesRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "ai-notes-service",
});

export const AiNotesRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const AiNotesRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "ai-notes-service",
});

export const AiNotesRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 60,
  maxRequestsPerTenant: 120,
  skipPaths: ["/ai/health"],
});

export function configureAiNotesMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      AiNotesAuthContextMiddleware,
      AiNotesRequestLoggingMiddleware,
      AiNotesRequestMetricsMiddleware,
      AiNotesRequestTracingMiddleware,
      AiNotesRateLimitMiddleware,
      AiNotesTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
