import {
  CorrelationIdMiddleware,
  RequestLoggerMiddleware,
  SanitizeMiddleware,
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

const metricsRegistry = createMetricsRegistry({ serviceName: "auth-service" });
setDefaultMetricsRegistry(metricsRegistry);

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

export function configureAuthMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      AuthRequestLoggingMiddleware,
      AuthRequestMetricsMiddleware,
      AuthRequestTracingMiddleware,
      AuthRateLimitMiddleware,
      AuthTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
