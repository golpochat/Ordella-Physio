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

const metricsRegistry = createMetricsRegistry({ serviceName: "billing-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const BillingServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/billing/health"],
});

export const BillingServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/billing/health"],
});

export const BillingServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "billing-service",
});

export const BillingServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const BillingServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "billing-service",
});

export const BillingServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/billing/health"],
});

export function configureBillingMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      BillingServiceAuthContextMiddleware,
      BillingServiceRequestLoggingMiddleware,
      BillingServiceRequestMetricsMiddleware,
      BillingServiceRequestTracingMiddleware,
      BillingServiceRateLimitMiddleware,
      BillingServiceTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
