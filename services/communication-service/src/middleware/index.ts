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

const metricsRegistry = createMetricsRegistry({ serviceName: "communication-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const CommunicationServiceDomainResolverMiddleware = createDomainResolverMiddleware({
  skipPaths: ["/communication/health"],
});

export const CommunicationServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/communication/health"],
});

export const CommunicationServiceTenantStatusMiddleware = createTenantStatusMiddleware({
  skipPaths: ["/communication/health"],
});

export const CommunicationServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/communication/health"],
});

export const CommunicationServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "communication-service",
});

export const CommunicationServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const CommunicationServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "communication-service",
});

export const CommunicationServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/communication/health"],
});

export function configureCommunicationMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      CommunicationServiceAuthContextMiddleware,
      CommunicationServiceRequestLoggingMiddleware,
      CommunicationServiceRequestMetricsMiddleware,
      CommunicationServiceRequestTracingMiddleware,
      CommunicationServiceRateLimitMiddleware,
      CommunicationServiceDomainResolverMiddleware,
      CommunicationServiceTenantMiddleware,
      CommunicationServiceTenantStatusMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
