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

const metricsRegistry = createMetricsRegistry({ serviceName: "appointment-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const AppointmentServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/appointments/health"],
});

export const AppointmentServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/appointments/health"],
});

export const AppointmentServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "appointment-service",
});

export const AppointmentServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const AppointmentServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "appointment-service",
});

export const AppointmentServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/appointments/health"],
});

export function configureAppointmentMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      AppointmentServiceAuthContextMiddleware,
      AppointmentServiceRequestLoggingMiddleware,
      AppointmentServiceRequestMetricsMiddleware,
      AppointmentServiceRequestTracingMiddleware,
      AppointmentServiceRateLimitMiddleware,
      AppointmentServiceTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
