import { ERROR_CODES, HttpError } from "@ordella/errors";
import type { AppointmentValidationFieldError } from "@/models/Appointment";

export function appointmentValidationError(fields: AppointmentValidationFieldError[]) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function staffNotAvailableError(
  message = "The selected staff member is not available at this time.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.APPOINTMENT.STAFF_NOT_AVAILABLE,
    message,
  });
}

export function patientAlreadyBookedError(
  message = "The patient already has an appointment at this time.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.APPOINTMENT.PATIENT_ALREADY_BOOKED,
    message,
  });
}

export function invalidLocationError(
  message = "The selected location does not belong to this tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.APPOINTMENT.INVALID_LOCATION,
    message,
  });
}

export function appointmentForbiddenError(
  message = "You do not have permission to manage appointments.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
  });
}

export function appointmentUpdateForbiddenError(
  message = "You do not have permission to update appointments.",
) {
  return appointmentForbiddenError(message);
}

export function appointmentNotFoundError(message = "Appointment does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.APPOINTMENT.NOT_FOUND,
    message,
  });
}

export function appointmentTenantMismatchError(
  message = "You cannot modify appointments from another tenant.",
) {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.TENANT_MISMATCH,
    message,
  });
}

export function appointmentTenantRequiredError(
  message = "A tenant context is required to create appointments.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message,
  });
}

export function patientNotFoundForTenantError(message = "Patient does not belong to this tenant.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.APPOINTMENT.PATIENT_NOT_FOUND,
    message,
  });
}

export function staffNotFoundForTenantError(message = "Staff member does not belong to this tenant.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.APPOINTMENT.STAFF_NOT_FOUND,
    message,
  });
}

export function invalidAppointmentPaginationError(
  message = "Page and limit must be positive numbers.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_PAGINATION,
    message,
  });
}

export function invalidAppointmentFilterError(message = "Invalid filter value.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_FILTER,
    message,
  });
}

export function appointmentAlreadyCancelledError(
  message = "Appointment is already cancelled.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.APPOINTMENT.ALREADY_CANCELLED,
    message,
  });
}

export function appointmentAlreadyCompletedError(
  message = "Appointment is already completed.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.APPOINTMENT.ALREADY_COMPLETED,
    message,
  });
}

export function appointmentAlreadyNoShowError(
  message = "Appointment is already marked as no-show.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.APPOINTMENT.ALREADY_NO_SHOW,
    message,
  });
}

export function cannotCancelCompletedAppointmentError(
  message = "Completed appointments cannot be cancelled.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.APPOINTMENT.CANNOT_CANCEL_COMPLETED,
    message,
  });
}

export function cannotCompleteFutureAppointmentError(
  message = "Future appointments cannot be marked as completed.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.APPOINTMENT.CANNOT_COMPLETE_FUTURE,
    message,
  });
}

export function invalidAppointmentViewError(
  message = "Calendar view must be day, week, or month.",
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_VIEW,
    message,
  });
}

export function invalidAppointmentDateError(message = "A valid date is required.") {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.AUTH.INVALID_DATE,
    message,
  });
}

export function appointmentReminderValidationError(
  fields: Array<{ field: string; message: string }>,
) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { fields },
  });
}

export function appointmentReminderNotFoundError(message = "Reminder does not exist.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.APPOINTMENT.REMINDER_NOT_FOUND,
    message,
  });
}

export function appointmentReminderInPastError(
  message = "Reminder time must be in the future.",
) {
  return new HttpError({
    statusCode: 409,
    code: ERROR_CODES.APPOINTMENT.REMINDER_IN_PAST,
    message,
  });
}

export function appointmentReminderForbiddenError(
  message = "You do not have permission to manage appointment reminders.",
) {
  return appointmentForbiddenError(message);
}
