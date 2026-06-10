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

const metricsRegistry = createMetricsRegistry({ serviceName: "messaging-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const MessagingServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/messaging/health"],
});

export const MessagingServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/messaging/health"],
});

export const MessagingServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "messaging-service",
});

export const MessagingServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const MessagingServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "messaging-service",
});

export const MessagingServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/messaging/health"],
});

export function configureMessagingMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      MessagingServiceAuthContextMiddleware,
      MessagingServiceRequestLoggingMiddleware,
      MessagingServiceRequestMetricsMiddleware,
      MessagingServiceRequestTracingMiddleware,
      MessagingServiceRateLimitMiddleware,
      MessagingServiceTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
