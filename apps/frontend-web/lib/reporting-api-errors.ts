import { ApiError } from "@/lib/api-client";

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
  };
};

export function parseReportingErrors(
  error: unknown,
  fallbackMessage: string,
): {
  invalidDateRange: boolean;
  invalidGroupBy: boolean;
  forbidden: boolean;
  generalError: string | null;
} {
  let invalidDateRange = false;
  let invalidGroupBy = false;
  let forbidden = false;
  let generalError: string | null = null;

  if (!(error instanceof ApiError)) {
    return {
      invalidDateRange,
      invalidGroupBy,
      forbidden,
      generalError: fallbackMessage,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const code = payload?.error?.code;

  if (code === "INVALID_DATE_RANGE") {
    invalidDateRange = true;
    generalError = payload?.error?.message ?? "The provided date range is invalid.";
  } else if (code === "INVALID_GROUP_BY") {
    invalidGroupBy = true;
    generalError = payload?.error?.message ?? "Group by must be day, week, or month.";
  } else if (code === "FORBIDDEN" || error.status === 403) {
    forbidden = true;
    generalError = payload?.error?.message ?? "You do not have permission to view reports.";
  } else {
    generalError = payload?.error?.message ?? fallbackMessage;
  }

  return { invalidDateRange, invalidGroupBy, forbidden, generalError };
}

export function parseDashboardMetricsErrors(error: unknown) {
  return parseReportingErrors(error, "Failed to load dashboard metrics.");
}

export function parseAdvancedReportErrors(error: unknown) {
  return parseReportingErrors(error, "Failed to load report data.");
}

export function parseReportConfigErrors(
  error: unknown,
  fallbackMessage: string,
): {
  forbidden: boolean;
  tenantMismatch: boolean;
  savedReportNotFound: boolean;
  scheduledReportNotFound: boolean;
  invalidReportConfig: boolean;
  invalidFrequency: boolean;
  invalidRecipients: boolean;
  generalError: string | null;
} {
  const base = parseReportingErrors(error, fallbackMessage);
  let savedReportNotFound = false;
  let scheduledReportNotFound = false;
  let invalidReportConfig = false;
  let invalidFrequency = false;
  let invalidRecipients = false;
  let tenantMismatch = false;

  if (error instanceof ApiError) {
    const payload = error.payload as ApiErrorPayload | undefined;
    const code = payload?.error?.code;

    if (code === "SAVED_REPORT_NOT_FOUND") {
      savedReportNotFound = true;
    } else if (code === "SCHEDULED_REPORT_NOT_FOUND") {
      scheduledReportNotFound = true;
    } else if (code === "INVALID_REPORT_CONFIG") {
      invalidReportConfig = true;
    } else if (code === "INVALID_FREQUENCY") {
      invalidFrequency = true;
    } else if (code === "INVALID_RECIPIENTS") {
      invalidRecipients = true;
    } else if (code === "TENANT_MISMATCH") {
      tenantMismatch = true;
    }
  }

  return {
    ...base,
    tenantMismatch,
    savedReportNotFound,
    scheduledReportNotFound,
    invalidReportConfig,
    invalidFrequency,
    invalidRecipients,
  };
}
