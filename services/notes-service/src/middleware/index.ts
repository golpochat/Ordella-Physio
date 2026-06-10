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

const metricsRegistry = createMetricsRegistry({ serviceName: "notes-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const NotesServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/notes/health"],
});

export const NotesServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/notes/health"],
});

export const NotesServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "notes-service",
});

export const NotesServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const NotesServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "notes-service",
});

export const NotesServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/notes/health"],
});

export function configureNotesMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      NotesServiceAuthContextMiddleware,
      NotesServiceRequestLoggingMiddleware,
      NotesServiceRequestMetricsMiddleware,
      NotesServiceRequestTracingMiddleware,
      NotesServiceRateLimitMiddleware,
      NotesServiceTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
