import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { PatientNoteValidationFieldError } from "@/models/PatientNote";

export function patientNoteValidationError(fields: PatientNoteValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function patientNoteNotFoundError(message = "Medical note does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.NOTES.NOT_FOUND,
    message,
  });
}

export function patientNotesForbiddenError(
  message = "You do not have permission to manage patient notes.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function invalidPatientNotePaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function invalidPatientNoteFilterError(message = "Invalid filter value.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}
