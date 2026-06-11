import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { TerminalValidationFieldError } from "@/models/Terminal";

export function terminalValidationError(fields: TerminalValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function terminalCodeExistsError(
  message = "This terminal code is already in use for this location.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TERMINAL.CODE_EXISTS,
    message,
    metadata: { field: "code" },
  });
}

export function terminalForbiddenError(
  message = "You do not have permission to create terminals.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function terminalUpdateForbiddenError(
  message = "You do not have permission to update terminals.",
) {
  return terminalForbiddenError(message);
}

export function terminalNotFoundError(message = "Terminal does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.TERMINAL.NOT_FOUND,
    message,
  });
}

export function terminalTenantMismatchError(
  message = "You cannot modify terminals from another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function locationNotInTenantError(
  message = "You cannot create terminals for another tenant's location.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.TERMINAL.LOCATION_NOT_IN_TENANT,
    message,
  });
}

export function locationNotInTenantUpdateError(
  message = "You cannot assign terminals to another tenant's location.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.TERMINAL.LOCATION_NOT_IN_TENANT,
    message,
  });
}

export function terminalTenantRequiredError(
  message = "A tenant context is required to create terminals.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: { field: "tenantId" },
  });
}

export function invalidTerminalPaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function invalidTerminalFilterError(
  message = "Invalid type or status filter.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}

export function terminalAlreadyInactiveError(message = "Terminal is already inactive.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TERMINAL.ALREADY_INACTIVE,
    message,
  });
}

export function terminalAlreadyActiveError(message = "Terminal is already active.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TERMINAL.ALREADY_ACTIVE,
    message,
  });
}

export function terminalInActiveUseError(
  message = "This terminal cannot be deactivated because it is currently in use.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TERMINAL.IN_ACTIVE_USE,
    message,
  });
}

export function terminalModifyForbiddenError(
  message = "You do not have permission to modify terminals.",
) {
  return terminalForbiddenError(message);
}
