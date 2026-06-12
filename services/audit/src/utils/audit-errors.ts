import { ERROR_CODES, HttpError } from "@ordella/errors";

export function auditValidationError(fields: Array<{ field: string; message: string }>) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { error: "VALIDATION_ERROR", fields },
  });
}

export function auditForbiddenError(
  message = "You do not have permission to view audit logs.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
    metadata: { error: "FORBIDDEN" },
  });
}

export function auditWriteForbiddenError(
  message = "You do not have permission to write audit logs.",
) {
  return auditForbiddenError(message);
}

export function auditTenantMismatchError(
  message = "You cannot write audit logs for another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
    metadata: { error: "TENANT_MISMATCH" },
  });
}

export function invalidPaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
    metadata: { error: "INVALID_PAGINATION" },
  });
}

export function invalidFilterError(message = "One or more filters are invalid.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
    metadata: { error: "INVALID_FILTER" },
  });
}

export function invalidDateRangeError(message = "The provided date range is invalid.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_DATE,
    message,
    metadata: { error: "INVALID_DATE_RANGE" },
  });
}

export function auditExportForbiddenError(
  message = "You do not have permission to export audit logs.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
    metadata: { error: "FORBIDDEN" },
  });
}
