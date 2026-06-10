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

const metricsRegistry = createMetricsRegistry({ serviceName: "reporting-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const ReportingServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/reporting/health"],
});

export const ReportingServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/reporting/health"],
});

export const ReportingServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "reporting-service",
});

export const ReportingServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const ReportingServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "reporting-service",
});

export const ReportingServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/reporting/health"],
});

export function configureReportingMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      ReportingServiceAuthContextMiddleware,
      ReportingServiceRequestLoggingMiddleware,
      ReportingServiceRequestMetricsMiddleware,
      ReportingServiceRequestTracingMiddleware,
      ReportingServiceRateLimitMiddleware,
      ReportingServiceTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
