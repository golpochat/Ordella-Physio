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

const metricsRegistry = createMetricsRegistry({ serviceName: "notification-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const NotificationServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/notifications/health"],
});

export const NotificationServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/notifications/health"],
});

export const NotificationServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "notification-service",
});

export const NotificationServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const NotificationServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "notification-service",
});

export const NotificationServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/notifications/health"],
});

export function configureNotificationMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      NotificationServiceAuthContextMiddleware,
      NotificationServiceRequestLoggingMiddleware,
      NotificationServiceRequestMetricsMiddleware,
      NotificationServiceRequestTracingMiddleware,
      NotificationServiceRateLimitMiddleware,
      NotificationServiceTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
