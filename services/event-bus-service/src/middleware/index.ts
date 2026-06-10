import {
  CorrelationIdMiddleware,
  RequestLoggerMiddleware,
  SanitizeMiddleware,
  createCorsMiddleware,
  createHelmetMiddleware,
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

const metricsRegistry = createMetricsRegistry({ serviceName: "event-bus-service" });
setDefaultMetricsRegistry(metricsRegistry);

export const EventBusServiceRequestLoggingMiddleware = createRequestLoggingMiddleware({
  serviceName: "event-bus-service",
});

export const EventBusServiceRequestMetricsMiddleware = createRequestMetricsMiddleware({
  registry: metricsRegistry,
});

export const EventBusServiceRequestTracingMiddleware = createRequestTracingMiddleware({
  tracerName: "event-bus-service",
});

export function configureEventBusMiddleware(consumer: MiddlewareConsumer): void {
  consumer
    .apply(
      createHelmetMiddleware(),
      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),
      CorrelationIdMiddleware,
      RequestLoggerMiddleware,
      EventBusServiceRequestLoggingMiddleware,
      EventBusServiceRequestMetricsMiddleware,
      EventBusServiceRequestTracingMiddleware,
      SanitizeMiddleware,
    )
    .forRoutes({ path: "*", method: RequestMethod.ALL });
}
