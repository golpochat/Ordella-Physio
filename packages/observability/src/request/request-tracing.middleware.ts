import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import { CORRELATION_HEADER, TRACE_HEADER } from "../constants";
import { endSpan, runWithSpan, startSpan } from "../tracing/tracer";
import { generateTraceId, getHeaderValue } from "../utils";
import { getRequestRoute, type InstrumentedRequest } from "./types";

export type RequestTracingMiddlewareOptions = {
  tracerName?: string;
};

@Injectable()
export class RequestTracingMiddleware implements NestMiddleware {
  constructor(private readonly options: RequestTracingMiddlewareOptions = {}) {}

  use(request: InstrumentedRequest, response: Response, next: NextFunction): void {
    const correlationId =
      request.correlationId ?? getHeaderValue(request.headers, CORRELATION_HEADER);
    const incomingTraceId = getHeaderValue(request.headers, TRACE_HEADER);
    const spanName = `${request.method} ${getRequestRoute(request)}`;

    const span = startSpan(spanName, {
      attributes: {
        "http.method": request.method,
        "http.route": getRequestRoute(request),
        "http.target": request.originalUrl,
        ...(correlationId ? { correlation_id: correlationId } : {}),
      },
    });

    const traceId = span.spanContext().traceId || incomingTraceId || generateTraceId();
    request.span = span;
    request.traceId = traceId;
    request.correlationId = correlationId;

    response.setHeader(TRACE_HEADER, traceId);

    runWithSpan(span, () => {
      response.on("finish", () => {
        span.setAttribute("http.status_code", response.statusCode);
        endSpan(span);
      });

      next();
    });
  }
}

export function createRequestTracingMiddleware(
  options?: RequestTracingMiddlewareOptions,
): typeof RequestTracingMiddleware {
  @Injectable()
  class ConfiguredRequestTracingMiddleware extends RequestTracingMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredRequestTracingMiddleware;
}
