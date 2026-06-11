import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { TenantValidationFieldError } from "@/models/Tenant";

export function tenantValidationError(fields: TenantValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function tenantCodeExistsError(
  message = "This tenant code is already in use.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TENANT.CODE_EXISTS,
    message,
    metadata: { field: "code" },
  });
}

export function ownerNotFoundError(message = "Selected owner does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.TENANT.OWNER_NOT_FOUND,
    message,
  });
}

export function tenantNotFoundError(message = "Tenant does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.TENANT.NOT_FOUND,
    message,
  });
}

export function tenantAlreadySuspendedError(message = "Tenant is already suspended.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TENANT.ALREADY_SUSPENDED,
    message,
  });
}

export function tenantAlreadyActiveError(message = "Tenant is already active.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TENANT.ALREADY_ACTIVE,
    message,
  });
}

export function invalidTimezoneError(
  message = "Timezone must be a valid IANA timezone.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.TENANT.INVALID_TIMEZONE,
    message,
    metadata: { field: "timezone" },
  });
}

export function invalidCurrencyError(
  message = "Currency must be a valid ISO 4217 code.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.TENANT.INVALID_CURRENCY,
    message,
    metadata: { field: "currency" },
  });
}

export function invalidNamespaceError(message = "Unknown configuration namespace.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.TENANT.INVALID_NAMESPACE,
    message,
  });
}

export function tenantMismatchError(
  message = "You cannot access resources for another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function domainExistsError(
  message = "This domain is already mapped to another tenant.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TENANT.DOMAIN_EXISTS,
    message,
    metadata: { field: "domain" },
  });
}

export function domainNotFoundError(message = "Domain not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.TENANT.DOMAIN_NOT_FOUND,
    message,
  });
}

export function invalidVerificationTokenError(
  message = "The verification token is invalid.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.TENANT.INVALID_VERIFICATION_TOKEN,
    message,
  });
}

export function cannotDeletePrimaryDomainError(
  message = "Primary domain cannot be removed.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.TENANT.CANNOT_DELETE_PRIMARY_DOMAIN,
    message,
  });
}
