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



const metricsRegistry = createMetricsRegistry({ serviceName: "notification-provider-service" });

setDefaultMetricsRegistry(metricsRegistry);



const skipPaths = ["/notification-providers/health", "/notification-providers/internal"];



export const NotificationProviderAuthContextMiddleware = createAuthContextMiddleware({

  required: false,

  skipPaths,

});



export const NotificationProviderTenantMiddleware = createTenantMiddleware({

  required: false,

  skipPaths,

});



export function configureNotificationProviderMiddleware(consumer: MiddlewareConsumer): void {

  consumer

    .apply(

      createHelmetMiddleware(),

      createCorsMiddleware({ origin: process.env.CORS_ORIGIN ?? "*", credentials: true }),

      CorrelationIdMiddleware,

      RequestLoggerMiddleware,

      NotificationProviderAuthContextMiddleware,

      createRequestLoggingMiddleware({ serviceName: "notification-provider-service" }),

      createRequestMetricsMiddleware({ registry: metricsRegistry }),

      createRequestTracingMiddleware({ tracerName: "notification-provider-service" }),

      createRateLimitMiddleware({

        windowMs: 60_000,

        maxRequestsPerIp: 100,

        maxRequestsPerTenant: 200,

        skipPaths,

      }),

      NotificationProviderTenantMiddleware,

      SanitizeMiddleware,

    )

    .forRoutes({ path: "*", method: RequestMethod.ALL });

}


