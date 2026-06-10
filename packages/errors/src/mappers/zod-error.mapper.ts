import type { ZodError } from "zod";
import { HttpError } from "../base/http-error";
import { ERROR_CODES } from "../types/error-codes";
import type { NormalizedErrorPayload } from "../types/error-metadata";

export function mapZodError(error: ZodError, message = "Validation failed"): HttpError {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: {
      details: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      })),
    },
  });
}

export function isZodError(error: unknown): error is ZodError {
  return (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray((error as ZodError).issues)
  );
}

export function normalizeZodError(error: unknown, message?: string): NormalizedErrorPayload {
  if (!isZodError(error)) {
    return {
      code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
      message: message ?? "Validation failed",
      statusCode: 400,
    };
  }

  const mapped = mapZodError(error, message);
  return {
    code: mapped.code,
    message: mapped.message,
    metadata: mapped.metadata,
    statusCode: mapped.statusCode,
  };
}
