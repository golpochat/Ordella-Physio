import { ERROR_CODES, HttpError } from "@ordella/errors";

export function invalidDateRangeError() {
  return new HttpError({
    code: ERROR_CODES.REPORTING.INVALID_DATE_RANGE,
    message: "The provided date range is invalid.",
    statusCode: 400,
  });
}

export function reportingForbiddenError() {
  return new HttpError({
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message: "You do not have permission to manage reports.",
    statusCode: 403,
  });
}

export function invalidGroupByError() {
  return new HttpError({
    code: ERROR_CODES.REPORTING.INVALID_GROUP_BY,
    message: "Group by must be day, week, or month.",
    statusCode: 400,
  });
}

export function savedReportNotFoundError() {
  return new HttpError({
    code: ERROR_CODES.REPORTING.SAVED_REPORT_NOT_FOUND,
    message: "Saved report does not exist.",
    statusCode: 404,
  });
}

export function scheduledReportNotFoundError() {
  return new HttpError({
    code: ERROR_CODES.REPORTING.SCHEDULED_REPORT_NOT_FOUND,
    message: "Scheduled report does not exist.",
    statusCode: 404,
  });
}

export function invalidReportConfigError() {
  return new HttpError({
    code: ERROR_CODES.REPORTING.INVALID_REPORT_CONFIG,
    message: "The report configuration is invalid.",
    statusCode: 400,
  });
}

export function invalidFrequencyError() {
  return new HttpError({
    code: ERROR_CODES.REPORTING.INVALID_FREQUENCY,
    message: "Frequency must be daily, weekly, or monthly.",
    statusCode: 400,
  });
}

export function invalidRecipientsError() {
  return new HttpError({
    code: ERROR_CODES.REPORTING.INVALID_RECIPIENTS,
    message: "At least one valid recipient email is required.",
    statusCode: 400,
  });
}

export function tenantMismatchError() {
  return new HttpError({
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message: "You cannot access reports from another tenant.",
    statusCode: 403,
  });
}
