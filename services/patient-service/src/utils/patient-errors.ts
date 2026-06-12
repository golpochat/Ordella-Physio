import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { PatientValidationFieldError } from "@/models/Patient";

export function patientValidationError(fields: PatientValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function patientEmailExistsError(
  message = "A patient with this email already exists.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.PATIENT.EMAIL_EXISTS,
    message,
    metadata: { field: "email" },
  });
}

export function patientForbiddenError(
  message = "You do not have permission to create patients.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function patientUpdateForbiddenError(
  message = "You do not have permission to update patients.",
) {
  return patientForbiddenError(message);
}

export function patientNotFoundError(message = "Patient does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.PATIENT.NOT_FOUND,
    message,
  });
}

export function patientTenantMismatchError(
  message = "You cannot modify patients from another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function patientTenantRequiredError(
  message = "A tenant context is required to create patients.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
    metadata: { field: "tenantId" },
  });
}

export function invalidPatientPaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function invalidPatientFilterError(message = "Invalid filter value.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}

export function patientModifyForbiddenError(
  message = "You do not have permission to modify patients.",
) {
  return patientForbiddenError(message);
}

export function patientAlreadyInactiveError(message = "Patient is already inactive.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.PATIENT.ALREADY_INACTIVE,
    message,
  });
}

export function patientAlreadyActiveError(message = "Patient is already active.") {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.PATIENT.ALREADY_ACTIVE,
    message,
  });
}

export function patientHasActiveAppointmentsError(
  message = "This patient cannot be deactivated because they have active appointments.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.PATIENT.HAS_ACTIVE_APPOINTMENTS,
    message,
  });
}
