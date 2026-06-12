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
import { AUDIT_LOG_ROUTES } from "@/routes/audit-log.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "audit-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [AUDIT_LOG_ROUTES.health, "/audit-logs/internal"];

export const AuditAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const AuditTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureAuditMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      AuditAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "audit-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "audit-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      AuditTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
