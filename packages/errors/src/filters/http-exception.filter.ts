import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { HttpError } from "../base/http-error";
import { errorLogger } from "../helpers/error-logger";
import { CORRELATION_ID_HEADER, ERROR_CODES } from "../types/error-codes";

function getCorrelationId(request: Request): string | undefined {
  const value =
    request.headers[CORRELATION_ID_HEADER] ??
    request.headers[CORRELATION_ID_HEADER.toLowerCase()];

  return typeof value === "string" ? value : Array.isArray(value) ? value[0] : undefined;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const correlationId = getCorrelationId(request);
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === "string"
        ? exceptionResponse
        : typeof exceptionResponse === "object" &&
            exceptionResponse !== null &&
            "message" in exceptionResponse
          ? String((exceptionResponse as { message: unknown }).message)
          : exception.message;

    const metadata =
      typeof exceptionResponse === "object" &&
      exceptionResponse !== null &&
      !Array.isArray(exceptionResponse)
        ? (exceptionResponse as Record<string, unknown>)
        : {};

    const code =
      typeof metadata.code === "string" ? metadata.code : ERROR_CODES.SYSTEM.VALIDATION_ERROR;

    const httpError = new HttpError({
      statusCode,
      code: code as never,
      message,
      metadata,
    });

    errorLogger(
      {
        level: statusCode >= 500 ? "error" : "warn",
        message: `${request.method} ${request.originalUrl} httpException status=${statusCode}`,
        stack: exception.stack,
        metadata: httpError.metadata,
        correlationId,
      },
      this.logger,
    );

    response.status(statusCode).json({
      ...httpError.serialize(),
      correlationId,
    });
  }
}
