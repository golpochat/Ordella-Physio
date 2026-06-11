import { ApiError } from "@/lib/api-client";
import { resolveAuthErrorMessage } from "@/lib/auth-error-messages";

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (error instanceof ApiError) {
    return resolveAuthErrorMessage(error.payload, error.message || fallback);
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function isAuthError(error: unknown): boolean {
  return error instanceof ApiError && (error.status === 401 || error.status === 403);
}
