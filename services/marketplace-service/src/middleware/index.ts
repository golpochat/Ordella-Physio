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

const metricsRegistry = createMetricsRegistry({ serviceName: "marketplace-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const MarketplaceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/marketplace/health", "/marketplace/oauth/redirect", "/marketplace/webhooks"],
});

export const MarketplaceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/marketplace/health", "/marketplace/oauth/redirect", "/marketplace/webhooks"],
});

export function configureMarketplaceMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      MarketplaceAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "marketplace-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "marketplace-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths: ["/marketplace/health", "/marketplace/oauth/redirect"],
      }),
      MarketplaceTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
