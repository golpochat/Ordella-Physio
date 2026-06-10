import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import { recordHttpRequest } from "../metrics/counters";
import { getMetricsRegistry, type MetricsRegistry } from "../metrics/prometheus";
import { elapsedMs, now } from "../utils";
import { getRequestRoute, type InstrumentedRequest } from "./types";

export type RequestMetricsMiddlewareOptions = {
  registry?: MetricsRegistry;
};

@Injectable()
export class RequestMetricsMiddleware implements NestMiddleware {
  private readonly registry: MetricsRegistry;

  constructor(options: RequestMetricsMiddlewareOptions = {}) {
    this.registry = options.registry ?? getMetricsRegistry();
  }

  use(request: InstrumentedRequest, response: Response, next: NextFunction): void {
    request.startTime = request.startTime ?? now();

    response.on("finish", () => {
      recordHttpRequest(this.registry, {
        method: request.method,
        route: getRequestRoute(request),
        statusCode: response.statusCode,
        durationSeconds: elapsedMs(request.startTime ?? now()) / 1000,
      });
    });

    next();
  }
}

export function createRequestMetricsMiddleware(
  options?: RequestMetricsMiddlewareOptions,
): typeof RequestMetricsMiddleware {
  @Injectable()
  class ConfiguredRequestMetricsMiddleware extends RequestMetricsMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredRequestMetricsMiddleware;
}
