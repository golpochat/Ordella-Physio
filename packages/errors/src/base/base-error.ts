import type { ErrorCode } from "../types/error-codes";
import type { ErrorMetadata } from "../types/error-metadata";

export type BaseErrorOptions = {
  code: ErrorCode;
  message: string;
  metadata?: ErrorMetadata;
  cause?: unknown;
};

export class BaseError extends Error {
  readonly code: ErrorCode;
  readonly metadata: ErrorMetadata;
  readonly timestamp: string;

  constructor(options: BaseErrorOptions) {
    super(options.message, { cause: options.cause });
    this.name = this.constructor.name;
    this.code = options.code;
    this.metadata = options.metadata ?? {};
    this.timestamp = new Date().toISOString();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      metadata: this.metadata,
      timestamp: this.timestamp,
    };
  }
}

export function isBaseError(error: unknown): error is BaseError {
  return error instanceof BaseError;
}
