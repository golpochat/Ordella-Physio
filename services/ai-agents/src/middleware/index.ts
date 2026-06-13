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

const metricsRegistry = createMetricsRegistry({ serviceName: "ai-agents-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [HEALTH_ROUTES.health];

export const AiAgentsAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const AiAgentsTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureAiAgentsMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      AiAgentsAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "ai-agents-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "ai-agents-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      AiAgentsTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
