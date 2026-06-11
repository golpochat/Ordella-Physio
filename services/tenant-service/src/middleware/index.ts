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

const metricsRegistry = createMetricsRegistry({ serviceName: "tenant-service" });
setDefaultMetricsRegistry(metricsRegistry);

const TENANT_PUBLIC_PATHS = [
  "/tenants/health",
  "/tenants/directory",
  "/tenants",
  "/tenants/internal/billing-sync",
];

export const TenantServiceTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths: TENANT_PUBLIC_PATHS,
});

export const TenantServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: TENANT_PUBLIC_PATHS,
});

export const TenantServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "tenant-service",
});

export const TenantServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const TenantServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "tenant-service",
});

export const TenantServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/tenants/health"],
});

export function configureTenantMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      TenantServiceAuthContextMiddleware,
      TenantServiceRequestLoggingMiddleware,
      TenantServiceRequestMetricsMiddleware,
      TenantServiceRequestTracingMiddleware,
      TenantServiceRateLimitMiddleware,
      TenantServiceTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
