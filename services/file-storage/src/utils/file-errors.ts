import { ERROR_CODES, HttpError } from "@ordella/errors";

export function fileValidationError(fields: Array<{ field: string; message: string }>) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { error: "VALIDATION_ERROR", fields },
  });
}

export function fileTooLargeError(message = "File exceeds maximum allowed size.") {
  return new HttpError({
    statusCode: 413,
    code: ERROR_CODES.FILE.TOO_LARGE,
    message,
    metadata: { error: "FILE_TOO_LARGE" },
  });
}

export function fileNotFoundError(message = "File does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.FILE.NOT_FOUND,
    message,
    metadata: { error: "FILE_NOT_FOUND" },
  });
}

export function fileForbiddenError(message = "You do not have permission to manage files.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
    metadata: { error: "FORBIDDEN" },
  });
}

export function fileTenantMismatchError(
  message = "You cannot access files from another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
    metadata: { error: "TENANT_MISMATCH" },
  });
}

export function fileStorageError(message = "File storage operation failed.") {
  return new HttpError({
    statusCode: 500,
    code: ERROR_CODES.FILE.STORAGE_ERROR,
    message,
    metadata: { error: "STORAGE_ERROR" },
  });
}

export function invalidPaginationError(message = "Page and limit must be positive numbers.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
    metadata: { error: "INVALID_PAGINATION" },
  });
}

export function invalidSignedUrlError(message = "The file access link is invalid or expired.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.FILE.INVALID_ACCESS_TOKEN,
    message,
    metadata: { error: "INVALID_ACCESS_TOKEN" },
  });
}

export function virusDetectedError(message = "The uploaded file contains a virus.") {
  return new HttpError({
    statusCode: 422,
    code: ERROR_CODES.FILE.VIRUS_DETECTED,
    message,
    metadata: { error: "VIRUS_DETECTED" },
  });
}

export function fileAlreadyDeletedError(message = "This file has already been deleted.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.FILE.ALREADY_DELETED,
    message,
    metadata: { error: "FILE_ALREADY_DELETED" },
  });
}

export function invalidDeleteStateError(
  message = "File must be soft-deleted before hard deletion.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.FILE.INVALID_DELETE_STATE,
    message,
    metadata: { error: "INVALID_DELETE_STATE" },
  });
}

export function cdnDisabledError(message = "CDN access is not enabled.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.FILE.CDN_DISABLED,
    message,
    metadata: { error: "CDN_DISABLED" },
  });
}

export function unsupportedImageTypeError(
  message = "This file type cannot be transformed.",
) {
  return new HttpError({
    statusCode: 415,
    code: ERROR_CODES.FILE.UNSUPPORTED_IMAGE_TYPE,
    message,
    metadata: { error: "UNSUPPORTED_IMAGE_TYPE" },
  });
}

export function storageFailoverWarning() {
  return {
    error: "STORAGE_FAILOVER",
    message: "Primary provider failed; fallback provider used.",
  };
}
