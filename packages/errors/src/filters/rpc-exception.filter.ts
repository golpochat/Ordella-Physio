import { Catch, RpcExceptionFilter, ArgumentsHost, Logger } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";
import { ERROR_CODES } from "../types/error-codes";
import { errorLogger } from "../helpers/error-logger";
import type { NormalizedErrorPayload } from "../types/error-metadata";

function normalizeRpcError(exception: unknown): NormalizedErrorPayload {
  if (exception instanceof RpcException) {
    const payload = exception.getError();

    if (typeof payload === "string") {
      return {
        code: ERROR_CODES.SYSTEM.SERVICE_UNAVAILABLE,
        message: payload,
        statusCode: 503,
      };
    }

    if (typeof payload === "object" && payload !== null) {
      const record = payload as Record<string, unknown>;
      return {
        code: typeof record.code === "string" ? record.code : ERROR_CODES.SYSTEM.SERVICE_UNAVAILABLE,
        message: typeof record.message === "string" ? record.message : "RPC error",
        metadata: record.metadata as Record<string, unknown> | undefined,
        statusCode: typeof record.statusCode === "number" ? record.statusCode : 503,
      };
    }
  }

  if (exception instanceof Error) {
    return {
      code: ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR,
      message: exception.message,
      statusCode: 500,
    };
  }

  return {
    code: ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR,
    message: "Unknown RPC error",
    statusCode: 500,
  };
}

@Catch(RpcException)
export class RpcExceptionFilterImpl implements RpcExceptionFilter<RpcException> {
  private readonly logger = new Logger(RpcExceptionFilterImpl.name);

  catch(exception: RpcException, _host: ArgumentsHost): Observable<never> {
    const normalized = normalizeRpcError(exception);

    errorLogger(
      {
        level: "error",
        message: normalized.message,
        metadata: normalized.metadata,
        context: "RpcExceptionFilter",
      },
      this.logger,
    );

    return throwError(() => ({
      success: false,
      error: {
        code: normalized.code,
        message: normalized.message,
        metadata: normalized.metadata,
      },
      timestamp: new Date().toISOString(),
    }));
  }
}

export { RpcExceptionFilterImpl as RpcExceptionFilter };
