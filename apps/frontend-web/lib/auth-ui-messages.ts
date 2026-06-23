/** User-facing copy for auth redirects (`?reason=` / `?message=` on login). */
export const LOGIN_REASON_MESSAGES: Record<string, string> = {
  "session-expired": "Your session has expired. Please sign in again.",
  unauthorized:
    "You don't have access to that page. Sign in with an account that has the right permissions.",
  "missing-tenant": "We couldn't determine your clinic. Please sign in again.",
  "token-reuse-detected":
    "Your previous session was ended for security. Please sign in again.",
  "trial-expired": "Your free trial has ended. Sign in to choose a plan and continue.",
  "access-denied":
    "You don't have permission to view that page. Try a different account or contact your clinic administrator.",
};

export const LOGIN_SUCCESS_MESSAGES: Record<string, string> = {
  "password-reset-success": "Your password has been updated. You can sign in now.",
};

export const ACCESS_DENIED_COPY = {
  title: "Access denied",
  description:
    "You don't have permission to view this page. If you think this is a mistake, contact your clinic administrator or sign in with a different account.",
  signInLabel: "Sign in",
  homeLabel: "Return home",
} as const;
