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
import { STRIPE_WEBHOOK_ROUTES } from "@/routes/stripe-webhook.routes";
import { USAGE_ROUTES } from "@/routes/usage.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "subscription-billing-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [HEALTH_ROUTES.health, STRIPE_WEBHOOK_ROUTES.webhook, USAGE_ROUTES.internal];

export const SubscriptionBillingAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const SubscriptionBillingTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureSubscriptionBillingMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      SubscriptionBillingAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "subscription-billing-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "subscription-billing-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      SubscriptionBillingTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
