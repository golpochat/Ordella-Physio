import { HttpError } from "../base/http-error";
import { ERROR_CODES } from "../types/error-codes";
import type { NormalizedErrorPayload } from "../types/error-metadata";

export type ClassValidatorError = {
  property: string;
  constraints?: Record<string, string>;
  children?: ClassValidatorError[];
};

export function flattenValidationErrors(
  errors: ClassValidatorError[],
  parentPath = "",
): Array<{ field: string; message: string; constraint?: string }> {
  const details: Array<{ field: string; message: string; constraint?: string }> = [];

  for (const error of errors) {
    const field = parentPath ? `${parentPath}.${error.property}` : error.property;

    if (error.constraints) {
      for (const [constraint, message] of Object.entries(error.constraints)) {
        details.push({ field, message, constraint });
      }
    }

    if (error.children?.length) {
      details.push(...flattenValidationErrors(error.children, field));
    }
  }

  return details;
}

export function mapValidationError(
  errors: ClassValidatorError[],
  message = "Validation failed",
): HttpError {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: {
      details: flattenValidationErrors(errors),
    },
  });
}

export function isClassValidatorErrorArray(value: unknown): value is ClassValidatorError[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "property" in item &&
        typeof (item as ClassValidatorError).property === "string",
    )
  );
}

export function normalizeValidationError(
  error: unknown,
  message?: string,
): NormalizedErrorPayload {
  if (!isClassValidatorErrorArray(error)) {
    return {
      code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
      message: message ?? "Validation failed",
      statusCode: 400,
    };
  }

  const mapped = mapValidationError(error, message);
  return {
    code: mapped.code,
    message: mapped.message,
    metadata: mapped.metadata,
    statusCode: mapped.statusCode,
  };
}
