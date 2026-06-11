import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { LocationValidationFieldError } from "@/models/Location";
import type { LocationConfigValidationFieldError } from "@/models/LocationConfig";

export function locationValidationError(fields: LocationValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function locationCodeExistsError(
  message = "This location code is already in use for this tenant.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.LOCATION.CODE_EXISTS,
    message,
    metadata: { field: "code" },
  });
}

export function locationForbiddenError(
  message = "You do not have permission to create locations.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function locationUpdateForbiddenError(
  message = "You do not have permission to update locations.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function locationNotFoundError(message = "Location does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.LOCATION.NOT_FOUND,
    message,
  });
}

export function locationTenantMismatchError(
  message = "You cannot modify locations from another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function locationTenantRequiredError(
  message = "A tenant context is required to create locations.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: { field: "tenantId" },
  });
}

export function invalidLocationPaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function locationModifyForbiddenError(
  message = "You do not have permission to modify locations.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function locationAlreadyInactiveError(message = "Location is already inactive.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.LOCATION.ALREADY_INACTIVE,
    message,
  });
}

export function locationAlreadyActiveError(message = "Location is already active.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.LOCATION.ALREADY_ACTIVE,
    message,
  });
}

export function locationHasActiveAppointmentsError(
  message = "This location cannot be deactivated because it has active appointments.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.LOCATION.HAS_ACTIVE_APPOINTMENTS,
    message,
  });
}

export function invalidLocationNamespaceError(message = "Unknown configuration namespace.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.LOCATION.INVALID_NAMESPACE,
    message,
  });
}

export function locationConfigValidationError(
  fields: LocationConfigValidationFieldError[],
  message = "Validation failed.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: { fields },
  });
}

export function locationConfigForbiddenError(
  message = "You do not have permission to modify location configuration.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function locationConfigTenantMismatchError(
  message = "You cannot modify configuration for another tenant's location.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function invalidLocationFilterError(message = "Invalid status filter.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}
