import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { RoleValidationFieldError } from "@/models/Role";

export function roleValidationError(fields: RoleValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function roleNameExistsError(message = "A role with this name already exists.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.ROLE.NAME_EXISTS,
    message,
    metadata: { field: "name" },
  });
}

export function roleCodeExistsError(message = "A role with this code already exists.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.ROLE.CODE_EXISTS,
    message,
    metadata: { field: "code" },
  });
}

export function invalidPermissionError(message = "One or more permissions are invalid.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.ROLE.INVALID_PERMISSION,
    message,
  });
}

export function roleForbiddenError(message = "You do not have permission to create roles.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function roleUpdateForbiddenError(message = "You do not have permission to update roles.") {
  return roleForbiddenError(message);
}

export function roleNotFoundError(message = "Role does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.ROLE.NOT_FOUND,
    message,
  });
}

export function systemRoleCannotBeModifiedError(message = "System roles cannot be modified.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.ROLE.SYSTEM_CANNOT_MODIFY,
    message,
  });
}

export function systemRoleCannotBeDeletedError(message = "System roles cannot be deleted.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.ROLE.SYSTEM_CANNOT_DELETE,
    message,
  });
}

export function roleAssignedToUsersError(
  message = "This role cannot be deleted because it is assigned to users.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.ROLE.ASSIGNED_TO_USERS,
    message,
  });
}

export function roleDeleteForbiddenError(message = "You do not have permission to delete roles.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function roleTenantMismatchError(message = "You cannot modify roles from another tenant.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function roleTenantRequiredError(message = "A tenant context is required to create roles.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function invalidRolePaginationError(message = "Page and limit must be positive numbers.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function invalidRoleFilterError(message = "Invalid filter value.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}
