import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import { CORRELATION_HEADER } from "../constants";
import { getLogger, type Logger } from "../logging/logger";
import { elapsedMs, getHeaderValue, now } from "../utils";
import { getRequestRoute, type InstrumentedRequest } from "./types";

export type RequestLoggingMiddlewareOptions = {
  logger?: Logger;
  serviceName?: string;
};

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger: Logger;

  constructor(options: RequestLoggingMiddlewareOptions = {}) {
    this.logger =
      options.logger ??
      getLogger().child({
        metadata: options.serviceName ? { service: options.serviceName } : undefined,
      });
  }

  use(request: InstrumentedRequest, response: Response, next: NextFunction): void {
    request.startTime = request.startTime ?? now();

    const correlationId =
      request.correlationId ?? getHeaderValue(request.headers, CORRELATION_HEADER);
    const tenantId = request.tenantId ?? getHeaderValue(request.headers, "x-tenant-id");
    const userId = request.userId ?? getHeaderValue(request.headers, "x-user-id");

    response.on("finish", () => {
      const durationMs = elapsedMs(request.startTime ?? now());

      this.logger.info("HTTP request completed", {
        method: request.method,
        path: request.originalUrl,
        route: getRequestRoute(request),
        statusCode: response.statusCode,
        durationMs,
        tenantId: tenantId ?? "n/a",
        userId: userId ?? "anonymous",
        correlationId: correlationId ?? "n/a",
        traceId: request.traceId ?? "n/a",
      });
    });

    next();
  }
}

export function createRequestLoggingMiddleware(
  options?: RequestLoggingMiddlewareOptions,
): typeof RequestLoggingMiddleware {
  @Injectable()
  class ConfiguredRequestLoggingMiddleware extends RequestLoggingMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredRequestLoggingMiddleware;
}
