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
import { PHARMACY_ROUTES } from "@/routes/pharmacy.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "pharmacy-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [PHARMACY_ROUTES.health, PHARMACY_ROUTES.ready];

export const PharmacyAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const PharmacyTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configurePharmacyMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      PharmacyAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "pharmacy-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "pharmacy-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      PharmacyTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
