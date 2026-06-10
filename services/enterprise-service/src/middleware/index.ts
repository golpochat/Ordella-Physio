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

const metricsRegistry = createMetricsRegistry({ serviceName: "enterprise-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [
  "/enterprise/health",
  "/enterprise/sso/saml/acs",
  "/enterprise/sso/saml/metadata",
  "/enterprise/sso/oauth/callback",
  "/enterprise/webhooks/inbound",
];

export const EnterpriseTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths,
});

export const EnterpriseAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export function configureEnterpriseMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      EnterpriseAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "enterprise-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "enterprise-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      EnterpriseTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
