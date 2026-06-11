import { ERROR_CODES, HttpError } from "@ordella/errors";

export function missingFieldsError(message = "Email and password are required.") {
  return new HttpError({
    statusCode: 400,
    code: "MISSING_FIELDS",
    message,
  });
}

export function invalidCredentialsError(message = "Email or password is incorrect.") {
  return new HttpError({
    statusCode: 401,
    code: "INVALID_CREDENTIALS",
    message,
  });
}

export function userDisabledError(message = "This account has been disabled.") {
  return new HttpError({
    statusCode: 403,
    code: "USER_DISABLED",
    message,
  });
}

export function invalidTokenError(message = "Your session has expired. Please log in again.") {
  return new HttpError({
    statusCode: 401,
    code: "INVALID_TOKEN",
    message,
  });
}

export function userNotFoundError(message = "No account exists with this email.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AUTH.USER_NOT_FOUND,
    message,
  });
}

export function invalidOrExpiredTokenError(message = "This link is invalid or has expired.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_OR_EXPIRED_TOKEN,
    message,
  });
}

export function weakPasswordError(message = "Password must be at least 8 characters.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.WEAK_PASSWORD,
    message,
  });
}

export function alreadyVerifiedError(message = "Your email is already verified.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.ALREADY_VERIFIED,
    message,
  });
}

export function invalidMfaCodeError(message = "The verification code is incorrect.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_MFA_CODE,
    message,
  });
}

export function mfaNotEnabledError(message = "Multi-factor authentication is not enabled for this account.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.MFA_NOT_ENABLED,
    message,
  });
}

export function mfaAlreadyEnabledError(message = "MFA is already active for this account.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.MFA_ALREADY_ENABLED,
    message,
  });
}

export function unauthorizedError(message = "Authentication required.") {
  return new HttpError({
    statusCode: 401,
    code: ERROR_CODES.AUTH.UNAUTHORIZED_ACCESS,
    message,
  });
}

export function forbiddenError(message = "You do not have permission to access this resource.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function tenantMismatchError(message = "You cannot access resources from another tenant.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function invalidRefreshTokenError(message = "Refresh token is invalid or expired.") {
  return new HttpError({
    statusCode: 401,
    code: ERROR_CODES.AUTH.INVALID_REFRESH_TOKEN,
    message,
  });
}

export function tokenReuseDetectedError(message = "Your session was compromised. Please log in again.") {
  return new HttpError({
    statusCode: 401,
    code: ERROR_CODES.AUTH.TOKEN_REUSE_DETECTED,
    message,
  });
}

export function tokenRevokedError(message = "This session is no longer valid.") {
  return new HttpError({
    statusCode: 401,
    code: ERROR_CODES.AUTH.TOKEN_REVOKED,
    message,
  });
}
