import type { Request } from "express";
import type { Span } from "@opentelemetry/api";

export interface InstrumentedRequest extends Request {
  startTime?: number;
  correlationId?: string;
  traceId?: string;
  tenantId?: string;
  userId?: string;
  span?: Span;
}

declare global {
  namespace Express {
    interface Request {
      startTime?: number;
      correlationId?: string;
      traceId?: string;
      tenantId?: string;
      userId?: string;
      span?: Span;
    }
  }
}

export function getRequestRoute(request: InstrumentedRequest): string {
  return request.route?.path ?? request.path ?? request.originalUrl.split("?")[0] ?? "unknown";
}
