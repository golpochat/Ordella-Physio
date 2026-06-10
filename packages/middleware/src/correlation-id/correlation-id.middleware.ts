import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { NextFunction, Response } from "express";
import { CORRELATION_ID_HEADER } from "../common/constants";
import type { OrdellaRequest } from "../common/types";
import { getHeaderValue } from "../utils";

export function getCorrelationId(request: OrdellaRequest): string | undefined {
  return request.correlationId ?? getHeaderValue(request, CORRELATION_ID_HEADER);
}

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(request: OrdellaRequest, response: Response, next: NextFunction): void {
    const existing = getHeaderValue(request, CORRELATION_ID_HEADER);
    const correlationId = existing ?? randomUUID();

    request.correlationId = correlationId;
    request.headers[CORRELATION_ID_HEADER] = correlationId;
    response.setHeader(CORRELATION_ID_HEADER, correlationId);

    next();
  }
}
