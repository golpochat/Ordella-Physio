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
import { TERMINAL_ROUTES } from "@/routes/terminal.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "terminal-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [TERMINAL_ROUTES.health];

export const TerminalAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const TerminalTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureTerminalMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      TerminalAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "terminal-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "terminal-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      TerminalTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
