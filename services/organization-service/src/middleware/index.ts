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
import { ORGANIZATION_ROUTES } from "@/routes/organization.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "organization-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [ORGANIZATION_ROUTES.health];

export const OrganizationAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const OrganizationTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureOrganizationMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      OrganizationAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "organization-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "organization-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      OrganizationTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
