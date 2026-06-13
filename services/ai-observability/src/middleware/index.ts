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
import { HEALTH_ROUTES } from "@/routes/health.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "ai-observability-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [HEALTH_ROUTES.health];

export const AiObservabilityAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const AiObservabilityTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureAiObservabilityMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      AiObservabilityAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "ai-observability-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "ai-observability-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      AiObservabilityTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
