import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { UserValidationFieldError } from "@/models/User";

export function userValidationError(fields: UserValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function emailExistsError(
  message = "A user with this email already exists in this tenant.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.AUTH.EMAIL_EXISTS,
    message,
    metadata: { field: "email" },
  });
}

export function roleNotAllowedError(
  message = "You cannot create a user with a higher role than yours.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.ROLE_NOT_ALLOWED,
    message,
  });
}

export function roleAssignNotAllowedError(
  message = "You cannot assign a role higher than your own.",
) {
  return roleNotAllowedError(message);
}

export function userNotFoundError(message = "User does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AUTH.USER_NOT_FOUND,
    message,
  });
}

export function userTenantMismatchError(
  message = "You cannot modify users from another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function roleModifyNotAllowedError(
  message = "You cannot modify a user with a higher role.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.ROLE_NOT_ALLOWED,
    message,
  });
}

export function userAlreadyDisabledError(message = "User is already disabled.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.AUTH.USER_ALREADY_DISABLED,
    message,
  });
}

export function userAlreadyActiveError(message = "User is already active.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.AUTH.USER_ALREADY_ACTIVE,
    message,
  });
}

export function cannotDisableSystemUserError(
  message = "System users cannot be disabled.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.CANNOT_DISABLE_SYSTEM_USER,
    message,
  });
}

export function cannotModifySystemUserError(
  message = "System users cannot be modified.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.CANNOT_MODIFY_SYSTEM_USER,
    message,
  });
}

export function forbiddenFieldError(
  message = "You cannot modify this field.",
  field?: string,
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN_FIELD,
    message,
    metadata: field ? { field } : undefined,
  });
}

export function invalidCurrentPasswordError(
  message = "Your current password is incorrect.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_CURRENT_PASSWORD,
    message,
    metadata: { field: "currentPassword" },
  });
}

export function invalidFileError(
  message = "Only image files up to 2MB are allowed.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILE,
    message,
  });
}

export function uploadFailedError(
  message = "Could not upload avatar. Try again.",
) {
  return new HttpError({
    statusCode: 500,
    code: ERROR_CODES.AUTH.UPLOAD_FAILED,
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

export function invalidFilterError(
  message = "Invalid role or status filter.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}
