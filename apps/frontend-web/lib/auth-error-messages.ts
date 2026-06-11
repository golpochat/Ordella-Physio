const AUTH_ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "Email or password is incorrect.",
  AUTH_INVALID_CREDENTIALS: "Email or password is incorrect.",
  USER_DISABLED: "Your account is disabled.",
  AUTH_USER_DISABLED: "Your account is disabled.",
  INVALID_TOKEN: "Your session expired, please log in again.",
  AUTH_INVALID_TOKEN: "Your session expired, please log in again.",
  MISSING_FIELDS: "Please fill in all required fields.",
  AUTH_MISSING_FIELDS: "Please fill in all required fields.",
  VALIDATION_ERROR: "Please fix the highlighted fields and try again.",
  EMAIL_EXISTS: "A user with this email already exists in this tenant.",
  ROLE_NOT_ALLOWED: "You cannot create a user with a higher role than yours.",
  USER_NOT_FOUND: "User does not exist.",
  USER_ALREADY_DISABLED: "User is already disabled.",
  USER_ALREADY_ACTIVE: "User is already active.",
  CANNOT_DISABLE_SYSTEM_USER: "System users cannot be disabled.",
  INVALID_CURRENT_PASSWORD: "Your current password is incorrect.",
  CANNOT_MODIFY_SYSTEM_USER: "System users cannot be modified.",
  FORBIDDEN_FIELD: "You cannot modify this field.",
  INVALID_OR_EXPIRED_TOKEN: "This link is invalid or expired.",
  WEAK_PASSWORD: "Password must be at least 8 characters.",
  ALREADY_VERIFIED: "Your email is already verified.",
  INVALID_MFA_CODE: "The code you entered is incorrect.",
  MFA_NOT_ENABLED: "MFA is not enabled for this account.",
  MFA_ALREADY_ENABLED: "MFA is already active.",
  FORBIDDEN: "You do not have permission to perform this action.",
  UNAUTHORIZED: "Authentication required.",
  TENANT_MISMATCH: "You cannot access resources from another tenant.",
  INVALID_REFRESH_TOKEN: "Your session expired. Please sign in again.",
  TOKEN_REUSE_DETECTED: "Your session was compromised. Please log in again.",
  TOKEN_REVOKED: "This session is no longer valid.",
};

export function resolveAuthErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const record = payload as Record<string, unknown>;

  if (typeof record.error === "string" && AUTH_ERROR_MESSAGES[record.error]) {
    return AUTH_ERROR_MESSAGES[record.error];
  }

  if (record.error && typeof record.error === "object") {
    const nested = record.error as { code?: string; message?: string };
    if (nested.code && AUTH_ERROR_MESSAGES[nested.code]) {
      return AUTH_ERROR_MESSAGES[nested.code];
    }
    if (nested.message) {
      return nested.message;
    }
  }

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }

  return fallback;
}
