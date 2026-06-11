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

const metricsRegistry = createMetricsRegistry({ serviceName: "payment-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const PaymentServiceDomainResolverMiddleware = createDomainResolverMiddleware({
  skipPaths: ["/payments/health"],
});

export const PaymentServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/payments/health"],
});

export const PaymentServiceTenantStatusMiddleware = createTenantStatusMiddleware({
  skipPaths: ["/payments/health"],
});

export const PaymentServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/payments/health"],
});

export const PaymentServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "payment-service",
});

export const PaymentServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const PaymentServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "payment-service",
});

export const PaymentServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/payments/health"],
});

export function configurePaymentMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      PaymentServiceAuthContextMiddleware,
      PaymentServiceRequestLoggingMiddleware,
      PaymentServiceRequestMetricsMiddleware,
      PaymentServiceRequestTracingMiddleware,
      PaymentServiceRateLimitMiddleware,
      PaymentServiceDomainResolverMiddleware,
      PaymentServiceTenantMiddleware,
      PaymentServiceTenantStatusMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
