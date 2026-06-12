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
import { ROLE_ROUTES } from "@/routes/role.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "user-role-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [ROLE_ROUTES.health, "/roles/internal"];

export const RoleAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const RoleTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureRoleMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      RoleAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "user-role-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "user-role-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      RoleTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
