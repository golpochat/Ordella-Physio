import {
  CorrelationIdMiddleware,
  RequestLoggerMiddleware,
  SanitizeMiddleware,
  createCorsMiddleware,
  createHelmetMiddleware,
  createRateLimitMiddleware,
  createDomainResolverMiddleware,
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
import { AuthJwtPreflightMiddleware } from "@/middleware/jwt-preflight.middleware";
import { AuditContextMiddleware } from "@/middleware/audit.middleware";

const metricsRegistry = createMetricsRegistry({ serviceName: "auth-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const AuthDomainResolverMiddleware = createDomainResolverMiddleware({
  skipPaths: ["/auth/health"],
});

export const AuthTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/auth/health"],
});

export const AuthRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "auth-service",
});

export const AuthRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const AuthRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "auth-service",
});

export const AuthRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/auth/health"],
});

export { requireRole, requireTenantMatch } from "@/middleware/role.middleware";
export { requirePermission } from "@/middleware/permission.middleware";
export { resolveRequestUser } from "@/middleware/request-user";

export function configureAuthMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      AuditContextMiddleware,
      RequestLoggerMiddleware,
      AuthRequestLoggingMiddleware,
      AuthRequestMetricsMiddleware,
      AuthRequestTracingMiddleware,
      AuthRateLimitMiddleware,
      AuthDomainResolverMiddleware,
      AuthJwtPreflightMiddleware,
      AuthTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
