import {
  CorrelationIdMiddleware,
  RequestLoggerMiddleware,
  SanitizeMiddleware,
  createAuthContextMiddleware,
  createCorsMiddleware,
  createHelmetMiddleware,
  createRateLimitMiddleware,
  createDomainResolverMiddleware,
  createTenantMiddleware,
  createTenantStatusMiddleware,
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

const metricsRegistry = createMetricsRegistry({ serviceName: "patient-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const PatientServiceDomainResolverMiddleware = createDomainResolverMiddleware({
  skipPaths: ["/patients/health"],
});

export const PatientServiceTenantMiddleware = createTenantMiddleware({
  required: true,
  skipPaths: ["/patients/health"],
});

export const PatientServiceTenantStatusMiddleware = createTenantStatusMiddleware({
  skipPaths: ["/patients/health"],
});

export const PatientServiceAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: ["/patients/health"],
});

export const PatientServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "patient-service",
});

export const PatientServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const PatientServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "patient-service",
});

export const PatientServiceRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 200,
  skipPaths: ["/patients/health"],
});

export function configurePatientMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      PatientServiceAuthContextMiddleware,
      PatientServiceRequestLoggingMiddleware,
      PatientServiceRequestMetricsMiddleware,
      PatientServiceRequestTracingMiddleware,
      PatientServiceRateLimitMiddleware,
      PatientServiceDomainResolverMiddleware,
      PatientServiceTenantMiddleware,
      PatientServiceTenantStatusMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
