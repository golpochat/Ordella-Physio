import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { HttpError, isHttpError } from "../base/http-error";
import { BaseError, isBaseError } from "../base/base-error";
import { errorLogger } from "../helpers/error-logger";
import { errorResponse } from "../helpers/error-response";
import {
  isPrismaLikeError,
  mapPrismaError,
} from "../mappers/prisma-error.mapper";
import { isZodError, mapZodError } from "../mappers/zod-error.mapper";
import {
  isClassValidatorErrorArray,
  mapValidationError,
} from "../mappers/validation-error.mapper";
import { CORRELATION_ID_HEADER, ERROR_CODES } from "../types/error-codes";
import type { StandardErrorResponse } from "../types/error-metadata";

export type GlobalExceptionFilterOptions = {
  loggerContext?: string;
  includeStack?: boolean;
};

function getCorrelationId(request: Request): string | undefined {
  const value =
    request.headers[CORRELATION_ID_HEADER] ??
    request.headers[CORRELATION_ID_HEADER.toLowerCase()];

  return typeof value === "string" ? value : Array.isArray(value) ? value[0] : undefined;
}

function normalizeException(exception: unknown): {
  statusCode: number;
  payload: StandardErrorResponse;
} {
  const timestamp = new Date().toISOString();

  if (isHttpError(exception)) {
    return {
      statusCode: exception.statusCode,
      payload: {
        ...exception.serialize(),
        timestamp,
      },
    };
  }

  if (isBaseError(exception)) {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      payload: errorResponse({
        code: exception.code,
        message: exception.message,
        metadata: exception.metadata,
        timestamp: exception.timestamp,
      }),
    };
  }

  if (exception instanceof HttpException) {
    const statusCode = exception.getStatus();
    const response = exception.getResponse();
    const message =
      typeof response === "string"
        ? response
        : typeof response === "object" && response !== null && "message" in response
          ? String((response as { message: unknown }).message)
          : exception.message;

    const metadata =
      typeof response === "object" && response !== null && !Array.isArray(response)
        ? (response as Record<string, unknown>)
        : undefined;

    return {
      statusCode,
      payload: errorResponse({
        code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
        message,
        metadata,
        timestamp,
      }),
    };
  }

  if (isZodError(exception)) {
    const mapped = mapZodError(exception);
    return {
      statusCode: mapped.statusCode,
      payload: { ...mapped.serialize(), timestamp },
    };
  }

  if (isClassValidatorErrorArray(exception)) {
    const mapped = mapValidationError(exception);
    return {
      statusCode: mapped.statusCode,
      payload: { ...mapped.serialize(), timestamp },
    };
  }

  if (isPrismaLikeError(exception)) {
    const mapped = mapPrismaError(exception);
    return {
      statusCode: mapped.statusCode,
      payload: { ...mapped.serialize(), timestamp },
    };
  }

  const message =
    exception instanceof Error
      ? exception.message
      : typeof exception === "string"
        ? exception
        : "Internal server error";

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    payload: errorResponse({
      code: ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR,
      message,
      timestamp,
    }),
  };
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly options: GlobalExceptionFilterOptions = {}) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const correlationId = getCorrelationId(request);
    const { statusCode, payload } = normalizeException(exception);

    errorLogger(
      {
        level: statusCode >= 500 ? "error" : "warn",
        message: `${request.method} ${request.originalUrl} failed status=${statusCode} message=${payload.error.message}`,
        stack: exception instanceof Error ? exception.stack : undefined,
        metadata: payload.error.metadata,
        correlationId,
        context: this.options.loggerContext,
      },
      this.logger,
    );

    response.status(statusCode).json({
      ...payload,
      correlationId,
      ...(this.options.includeStack && exception instanceof Error
        ? { stack: exception.stack }
        : {}),
    });
  }
}

export function createGlobalExceptionFilter(
  options?: GlobalExceptionFilterOptions,
): typeof GlobalExceptionFilter {
  @Catch()
  class ConfiguredGlobalExceptionFilter extends GlobalExceptionFilter {
    constructor() {
      super(options);
    }
  }

  return ConfiguredGlobalExceptionFilter;
}
