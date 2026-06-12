import {
  CorrelationIdMiddleware,
  RequestLoggerMiddleware,
  SanitizeMiddleware,
  createAuthContextMiddleware,
  createCorsMiddleware,
  createHelmetMiddleware,
  createRateLimitMiddleware,
  createDomainResolverMiddleware,
  createTenantMiddleware,
  createTenantStatusMiddleware,
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

const BILLING_PUBLIC_PATHS = ["/billing/health", "/billing/webhook", "/billing/internal"];

export const BillingServiceDomainResolverMiddleware = createDomainResolverMiddleware({
  skipPaths: BILLING_PUBLIC_PATHS,
});

export const BillingServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: BILLING_PUBLIC_PATHS,
});

export const BillingServiceTenantStatusMiddleware = createTenantStatusMiddleware({
  skipPaths: BILLING_PUBLIC_PATHS,
});

export const BillingServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: BILLING_PUBLIC_PATHS,
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
  skipPaths: BILLING_PUBLIC_PATHS,
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
      BillingServiceDomainResolverMiddleware,
      BillingServiceTenantMiddleware,
      BillingServiceTenantStatusMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
