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

const metricsRegistry = createMetricsRegistry({ serviceName: "ai-cost-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [HEALTH_ROUTES.health];

export const AiCostAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const AiCostTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureAiCostMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      AiCostAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "ai-cost-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "ai-cost-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      AiCostTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
