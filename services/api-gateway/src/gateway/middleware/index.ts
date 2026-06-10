import { gatewayConfig } from "@ordella/config";
import {
  CorrelationIdMiddleware,
  RequestLoggerMiddleware,
  SanitizeMiddleware,
  createCorsMiddleware,
  createHelmetMiddleware,
  createJsonLimitMiddleware,
  createRateLimitMiddleware,
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
import { PUBLIC_PATHS } from "@/constants";
import { AuthContextMiddleware } from "./auth-context.middleware";
import { RegionRoutingMiddleware } from "@/gateway/region/region-routing.middleware";
import { TenantContextMiddleware } from "./tenant-context.middleware";

const config = gatewayConfig;
const metricsRegistry = createMetricsRegistry({ serviceName: "api-gateway" });
setDefaultMetricsRegistry(metricsRegistry);

export const GatewayRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: config.gatewayRateLimitIp,
  maxRequestsPerTenant: config.gatewayRateLimitTenant,
  skipPaths: PUBLIC_PATHS,
});

export const GatewayRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "api-gateway",
});

export const GatewayRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const GatewayRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "api-gateway",
});

export const gatewayMiddlewareProviders = [
  CorrelationIdMiddleware,
  RequestLoggerMiddleware,
  SanitizeMiddleware,
  GatewayRateLimitMiddleware,
  TenantContextMiddleware,
  AuthContextMiddleware,
  RegionRoutingMiddleware,
  GatewayRequestLoggingMiddleware,
  GatewayRequestMetricsMiddleware,
  GatewayRequestTracingMiddleware,
];

export function configureGatewayMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: config.corsOrigin, credentials: true }),
      createJsonLimitMiddleware({
        limit: config.gatewayBodyLimit,
        verify: (request, _response, buffer) => {
          (request as typeof request & { rawBody?: Buffer }).rawBody = buffer;
        },
      }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      GatewayRequestLoggingMiddleware,
      GatewayRequestMetricsMiddleware,
      GatewayRequestTracingMiddleware,
      GatewayRateLimitMiddleware,
      TenantContextMiddleware,
      AuthContextMiddleware,
      RegionRoutingMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
