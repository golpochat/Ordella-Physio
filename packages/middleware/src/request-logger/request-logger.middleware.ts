import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import type { OrdellaRequest } from "../common/types";
import { getCorrelationId } from "../correlation-id/correlation-id.middleware";

export type RequestLoggerOptions = {
  loggerContext?: string;
  logBody?: boolean;
};

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

  constructor(private readonly options: RequestLoggerOptions = {}) {}

  use(request: OrdellaRequest, response: Response, next: NextFunction): void {
    request.startTime = Date.now();

    const correlationId = getCorrelationId(request);
    const tenantId = request.tenantId ?? request.authContext?.tenantId;
    const userId = request.authContext?.userId;

    response.on("finish", () => {
      const durationMs = Date.now() - (request.startTime ?? Date.now());
      const context = this.options.loggerContext ? `[${this.options.loggerContext}] ` : "";

      this.logger.log(
        `${context}${request.method} ${request.originalUrl} status=${response.statusCode} duration=${durationMs}ms tenant=${tenantId ?? "n/a"} user=${userId ?? "anonymous"} correlation=${correlationId ?? "n/a"}`,
      );
    });

    next();
  }
}

export function createRequestLoggerMiddleware(
  options?: RequestLoggerOptions,
): typeof RequestLoggerMiddleware {
  @Injectable()
  class ConfiguredRequestLoggerMiddleware extends RequestLoggerMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredRequestLoggerMiddleware;
}
