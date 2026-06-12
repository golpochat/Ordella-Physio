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
import { SEARCH_ROUTES } from "@/routes/search.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "search-index-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [SEARCH_ROUTES.health];

export const SearchIndexAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const SearchIndexTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureSearchIndexMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      SearchIndexAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "search-index-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "search-index-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      SearchIndexTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
