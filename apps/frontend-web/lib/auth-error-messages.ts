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
