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
import { FILE_ROUTES } from "@/routes/file.routes";

const metricsRegistry = createMetricsRegistry({ serviceName: "file-storage-service" });
setDefaultMetricsRegistry(metricsRegistry);

const skipPaths = [FILE_ROUTES.health, FILE_ROUTES.access, FILE_ROUTES.internal];

export const FileStorageAuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths,
});

export const FileStorageTenantMiddleware = createTenantMiddleware({
  required: false,
  skipPaths,
});

export function configureFileStorageMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      FileStorageAuthContextMiddleware,
      createRequestLoggingMiddleware({ serviceName: "file-storage-service" }),
      createRequestMetricsMiddleware({ registry: metricsRegistry }),
      createRequestTracingMiddleware({ tracerName: "file-storage-service" }),
      createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 200,
        skipPaths,
      }),
      FileStorageTenantMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
