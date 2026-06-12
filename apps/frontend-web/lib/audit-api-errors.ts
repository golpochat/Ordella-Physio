import { getApiErrorCode } from "@/lib/session-manager";

export type ParsedAuditApiError = {
  toastError?: string;
  redirectForbidden?: boolean;
};

export function parseAuditApiError(error: unknown): ParsedAuditApiError {
  const code = getApiErrorCode(error);

  if (code === "FORBIDDEN" || code === "TENANT_MISMATCH") {
    return { redirectForbidden: true };
  }

  if (code === "INVALID_FILTER") {
    return { toastError: "One or more filters are invalid." };
  }

  if (code === "INVALID_DATE_RANGE" || code === "INVALID_DATE") {
    return { toastError: "The provided date range is invalid." };
  }

  if (code === "INVALID_PAGINATION") {
    return { toastError: "Page and limit must be positive numbers." };
  }

  return { toastError: "Unable to load audit logs." };
}
