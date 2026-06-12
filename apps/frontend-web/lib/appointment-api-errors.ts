import { ApiError } from "@/lib/api-client";

export type AppointmentFieldErrors = Record<string, string>;

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    metadata?: {
      fields?: Array<{ field?: string; message?: string }>;
    };
  };
};

function extractFieldErrors(apiError: ApiErrorPayload["error"]): AppointmentFieldErrors {
  const fieldErrors: AppointmentFieldErrors = {};

  for (const entry of apiError?.metadata?.fields ?? []) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseAppointmentCreateErrors(error: unknown): {
  fieldErrors: AppointmentFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  staffNotAvailable: boolean;
  patientAlreadyBooked: boolean;
  invalidLocation: boolean;
} {
  const fieldErrors: AppointmentFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let staffNotAvailable = false;
  let patientAlreadyBooked = false;
  let invalidLocation = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to create appointment.",
      forbidden,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to create appointments.",
      forbidden,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "STAFF_NOT_AVAILABLE") {
    staffNotAvailable = true;
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "The selected staff member is not available at this time.",
      forbidden,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "PATIENT_ALREADY_BOOKED") {
    patientAlreadyBooked = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "The patient already has an appointment at this time.",
      forbidden,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "INVALID_LOCATION") {
    invalidLocation = true;
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "The selected location does not belong to this tenant.",
      forbidden,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return {
      fieldErrors,
      generalError,
      forbidden,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to create appointment.",
    forbidden,
    staffNotAvailable,
    patientAlreadyBooked,
    invalidLocation,
  };
}

export function parseAppointmentUpdateErrors(error: unknown): {
  fieldErrors: AppointmentFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  staffNotAvailable: boolean;
  patientAlreadyBooked: boolean;
  invalidLocation: boolean;
} {
  const fieldErrors: AppointmentFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let notFound = false;
  let staffNotAvailable = false;
  let patientAlreadyBooked = false;
  let invalidLocation = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update appointment.",
      forbidden,
      tenantMismatch,
      notFound,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to update appointments.",
      forbidden,
      tenantMismatch,
      notFound,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify appointments from another tenant.",
      forbidden,
      tenantMismatch,
      notFound,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "APPOINTMENT_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Appointment does not exist.",
      forbidden,
      tenantMismatch,
      notFound,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "STAFF_NOT_AVAILABLE") {
    staffNotAvailable = true;
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "The selected staff member is not available at this time.",
      forbidden,
      tenantMismatch,
      notFound,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "PATIENT_ALREADY_BOOKED") {
    patientAlreadyBooked = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "The patient already has an appointment at this time.",
      forbidden,
      tenantMismatch,
      notFound,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "INVALID_LOCATION") {
    invalidLocation = true;
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "The selected location does not belong to this tenant.",
      forbidden,
      tenantMismatch,
      notFound,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return {
      fieldErrors,
      generalError,
      forbidden,
      tenantMismatch,
      notFound,
      staffNotAvailable,
      patientAlreadyBooked,
      invalidLocation,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to update appointment.",
    forbidden,
    tenantMismatch,
    notFound,
    staffNotAvailable,
    patientAlreadyBooked,
    invalidLocation,
  };
}

export function parseAppointmentListErrors(error: unknown): {
  toastError: string | null;
} {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load appointments." };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "INVALID_PAGINATION") {
    return { toastError: apiError?.message ?? "Page and limit must be positive numbers." };
  }

  if (code === "INVALID_FILTER") {
    return { toastError: apiError?.message ?? "Invalid filter value." };
  }

  return { toastError: apiError?.message ?? "Failed to load appointments." };
}

export function parseAppointmentStatusActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update appointment status.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to modify appointments.",
      notFound: false,
      forbidden: true,
      tenantMismatch: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot modify appointments from another tenant.",
      notFound: false,
      forbidden: true,
      tenantMismatch: true,
    };
  }

  if (code === "APPOINTMENT_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Appointment does not exist.",
      notFound: true,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  if (
    code === "APPOINTMENT_ALREADY_CANCELLED" ||
    code === "APPOINTMENT_ALREADY_COMPLETED" ||
    code === "APPOINTMENT_ALREADY_NO_SHOW" ||
    code === "CANNOT_CANCEL_COMPLETED_APPOINTMENT" ||
    code === "CANNOT_COMPLETE_FUTURE_APPOINTMENT"
  ) {
    return {
      message: apiError?.message ?? "Unable to update appointment status.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  return {
    message: apiError?.message ?? "Failed to update appointment status.",
    notFound: false,
    forbidden: false,
    tenantMismatch: false,
  };
}

export function parseAppointmentCalendarErrors(error: unknown): {
  toastError: string | null;
} {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load calendar." };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "INVALID_VIEW") {
    return { toastError: apiError?.message ?? "Calendar view must be day, week, or month." };
  }

  if (code === "INVALID_DATE") {
    return { toastError: apiError?.message ?? "A valid date is required." };
  }

  if (code === "INVALID_FILTER") {
    return { toastError: apiError?.message ?? "Invalid filter value." };
  }

  return { toastError: apiError?.message ?? "Failed to load calendar." };
}

export function parseAppointmentReminderErrors(error: unknown): {
  fieldErrors: AppointmentFieldErrors;
  generalError: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
  reminderInPast: boolean;
  appointmentNotFound: boolean;
} {
  const fieldErrors: AppointmentFieldErrors = {};
  let generalError: string | null = null;
  let notFound = false;
  let forbidden = false;
  let tenantMismatch = false;
  let reminderInPast = false;
  let appointmentNotFound = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to save reminder.",
      notFound,
      forbidden,
      tenantMismatch,
      reminderInPast,
      appointmentNotFound,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to manage appointment reminders.",
      notFound,
      forbidden,
      tenantMismatch,
      reminderInPast,
      appointmentNotFound,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify reminders from another tenant.",
      notFound,
      forbidden,
      tenantMismatch,
      reminderInPast,
      appointmentNotFound,
    };
  }

  if (code === "APPOINTMENT_NOT_FOUND") {
    appointmentNotFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Appointment does not exist.",
      notFound,
      forbidden,
      tenantMismatch,
      reminderInPast,
      appointmentNotFound,
    };
  }

  if (code === "REMINDER_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Reminder does not exist.",
      notFound,
      forbidden,
      tenantMismatch,
      reminderInPast,
      appointmentNotFound,
    };
  }

  if (code === "REMINDER_IN_PAST") {
    reminderInPast = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Reminder time must be in the future.",
      notFound,
      forbidden,
      tenantMismatch,
      reminderInPast,
      appointmentNotFound,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));
    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }
    return {
      fieldErrors,
      generalError,
      notFound,
      forbidden,
      tenantMismatch,
      reminderInPast,
      appointmentNotFound,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to save reminder.",
    notFound,
    forbidden,
    tenantMismatch,
    reminderInPast,
    appointmentNotFound,
  };
}
