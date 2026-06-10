import { BaseError, type BaseErrorOptions } from "./base-error";
import type { ErrorMetadata } from "../types/error-metadata";

export type HttpErrorOptions = BaseErrorOptions & {
  statusCode: number;
};

export type SerializedHttpError = {
  success: false;
  error: {
    code: string;
    message: string;
    metadata: ErrorMetadata;
  };
  timestamp: string;
};

export class HttpError extends BaseError {
  readonly statusCode: number;

  constructor(options: HttpErrorOptions) {
    super(options);
    this.statusCode = options.statusCode;
  }

  serialize(): SerializedHttpError {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        metadata: this.metadata,
      },
      timestamp: this.timestamp,
    };
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}
