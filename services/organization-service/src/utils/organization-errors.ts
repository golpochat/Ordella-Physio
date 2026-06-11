import { ERROR_CODES, HttpError } from "@ordella/errors";
export function organizationValidationError(fields: Array<{ field: string; message: string }>) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function organizationCodeExistsError(
  message = "This organization code is already in use.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.ORGANIZATION.CODE_EXISTS,
    message,
    metadata: { field: "code" },
  });
}

export function organizationForbiddenError(
  message = "You do not have permission to create organizations.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function organizationUpdateForbiddenError(
  message = "You do not have permission to update organizations.",
) {
  return organizationForbiddenError(message);
}

export function organizationNotFoundError(message = "Organization does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.ORGANIZATION.NOT_FOUND,
    message,
  });
}

export function invalidPaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function invalidFilterError(message = "Invalid status filter.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}

export function organizationStatusForbiddenError(
  message = "You do not have permission to modify organizations.",
) {
  return organizationForbiddenError(message);
}

export function organizationAlreadyInactiveError(
  message = "Organization is already inactive.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.ORGANIZATION.ALREADY_INACTIVE,
    message,
  });
}

export function organizationAlreadyActiveError(message = "Organization is already active.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.ORGANIZATION.ALREADY_ACTIVE,
    message,
  });
}

export function organizationHasActiveTenantsError(
  message = "This organization cannot be deactivated because it has active tenants.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.ORGANIZATION.HAS_ACTIVE_TENANTS,
    message,
  });
}

export function organizationTenantForbiddenError(
  message = "You do not have permission to modify organization tenants.",
) {
  return organizationForbiddenError(message);
}

export function tenantNotFoundError(message = "Tenant does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.TENANT.NOT_FOUND,
    message,
  });
}

export function tenantAlreadyAssignedError(
  message = "This tenant is already linked to an organization.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TENANT.ALREADY_ASSIGNED,
    message,
  });
}

export function tenantNotInOrganizationError(
  message = "This tenant is not linked to the specified organization.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TENANT.NOT_IN_ORGANIZATION,
    message,
  });
}

export function tenantActiveCannotRemoveError(
  message = "Active tenants cannot be removed from an organization.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TENANT.ACTIVE_CANNOT_REMOVE,
    message,
  });
}

export function invalidNamespaceError(message = "Unknown configuration namespace.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.ORGANIZATION.INVALID_NAMESPACE,
    message,
  });
}

export function organizationConfigForbiddenError(
  message = "You do not have permission to modify organization configuration.",
) {
  return organizationForbiddenError(message);
}
