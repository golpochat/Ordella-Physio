import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { StaffValidationFieldError } from "@/models/Staff";

export function staffValidationError(fields: StaffValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function staffEmailExistsError(
  message = "A staff member with this email already exists.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.STAFF.EMAIL_EXISTS,
    message,
    metadata: { field: "email" },
  });
}

export function invalidRoleError(message = "The selected role is not valid for this tenant.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.STAFF.INVALID_ROLE,
    message,
  });
}

export function invalidLocationError(
  message = "One or more locations do not belong to this tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.STAFF.INVALID_LOCATION,
    message,
  });
}

export function staffForbiddenError(message = "You do not have permission to create staff.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function staffUpdateForbiddenError(
  message = "You do not have permission to update staff.",
) {
  return staffForbiddenError(message);
}

export function staffNotFoundError(message = "Staff member does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.STAFF.NOT_FOUND,
    message,
  });
}

export function staffTenantMismatchError(
  message = "You cannot modify staff from another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function staffTenantRequiredError(
  message = "A tenant context is required to create staff.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: { field: "tenantId" },
  });
}

export function invalidStaffPaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function invalidStaffFilterError(message = "Invalid filter value.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}

export function staffAlreadyInactiveError(message = "Staff member is already inactive.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.STAFF.ALREADY_INACTIVE,
    message,
  });
}

export function staffAlreadyActiveError(message = "Staff member is already active.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.STAFF.ALREADY_ACTIVE,
    message,
  });
}

export function staffHasActiveAppointmentsError(
  message = "This staff member cannot be deactivated because they have active appointments.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.STAFF.HAS_ACTIVE_APPOINTMENTS,
    message,
  });
}

export function staffModifyForbiddenError(
  message = "You do not have permission to modify staff.",
) {
  return staffForbiddenError(message);
}

export function invalidStaffConfigNamespaceError(
  message = "Unknown configuration namespace.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.STAFF.INVALID_NAMESPACE,
    message,
  });
}

export function staffConfigTenantMismatchError(
  message = "You cannot modify configuration for another tenant's staff member.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function staffConfigForbiddenError(
  message = "You do not have permission to modify staff configuration.",
) {
  return staffForbiddenError(message);
}
