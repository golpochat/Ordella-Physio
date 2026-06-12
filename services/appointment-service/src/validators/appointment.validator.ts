import {
  APPOINTMENT_TYPES,
  type AppointmentType,
  type AppointmentValidationFieldError,
  type CreateAppointmentPayload,
  type UpdateAppointmentPayload,
} from "@/models/Appointment";

export type NormalizedCreateAppointmentPayload = {
  patientId: string;
  staffId: string;
  locationId: string | null;
  appointmentType: AppointmentType;
  startTime: Date;
  endTime: Date;
  notes?: string;
};

export type CreateAppointmentValidationResult =
  | { valid: true; payload: NormalizedCreateAppointmentPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: AppointmentValidationFieldError[] };

function isValidDate(value: Date): boolean {
  return !Number.isNaN(value.getTime());
}

export function validateCreateAppointment(payload: unknown): CreateAppointmentValidationResult {
  const fields: AppointmentValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as CreateAppointmentPayload;
  const patientId = body.patientId?.trim() ?? "";
  const staffId = (body.staffId ?? body.therapistId)?.trim() ?? "";
  const locationId = body.locationId?.trim() ?? "";
  const appointmentType = (body.appointmentType ?? body.type) as AppointmentType | undefined;
  const startTimeRaw = body.startTime?.trim() ?? "";
  const endTimeRaw = body.endTime?.trim() ?? "";
  const notes = body.notes?.trim();

  if (!patientId) {
    fields.push({ field: "patientId", message: "Patient is required." });
  }

  if (!staffId) {
    fields.push({ field: "staffId", message: "Staff is required." });
  }

  if (!appointmentType) {
    fields.push({ field: "appointmentType", message: "Appointment type is required." });
  } else if (!APPOINTMENT_TYPES.includes(appointmentType)) {
    fields.push({
      field: "appointmentType",
      message: "Appointment type must be IN_PERSON or TELEMEDICINE.",
    });
  }

  if (appointmentType === "IN_PERSON" && !locationId) {
    fields.push({ field: "locationId", message: "Location is required for in-person appointments." });
  }

  if (!startTimeRaw) {
    fields.push({ field: "startTime", message: "Start time is required." });
  }

  if (!endTimeRaw) {
    fields.push({ field: "endTime", message: "End time is required." });
  }

  const startTime = startTimeRaw ? new Date(startTimeRaw) : new Date(Number.NaN);
  const endTime = endTimeRaw ? new Date(endTimeRaw) : new Date(Number.NaN);

  if (startTimeRaw && !isValidDate(startTime)) {
    fields.push({ field: "startTime", message: "Start time must be a valid date." });
  }

  if (endTimeRaw && !isValidDate(endTime)) {
    fields.push({ field: "endTime", message: "End time must be a valid date." });
  }

  if (
    isValidDate(startTime) &&
    isValidDate(endTime) &&
    endTime.getTime() <= startTime.getTime()
  ) {
    fields.push({ field: "endTime", message: "End time must be after start time." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    payload: {
      patientId,
      staffId,
      locationId: appointmentType === "TELEMEDICINE" ? null : locationId,
      appointmentType: appointmentType as AppointmentType,
      startTime,
      endTime,
      notes: notes || undefined,
    },
  };
}

export type NormalizedUpdateAppointmentPayload = {
  patientId?: string;
  staffId?: string;
  locationId?: string | null;
  appointmentType?: AppointmentType;
  startTime?: Date;
  endTime?: Date;
  notes?: string | null;
};

export type UpdateAppointmentValidationResult =
  | { valid: true; payload: NormalizedUpdateAppointmentPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: AppointmentValidationFieldError[] };

export function validateUpdateAppointment(payload: unknown): UpdateAppointmentValidationResult {
  const fields: AppointmentValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as UpdateAppointmentPayload;
  const normalized: NormalizedUpdateAppointmentPayload = {};

  if (body.patientId !== undefined) {
    const patientId = body.patientId.trim();
    if (!patientId) {
      fields.push({ field: "patientId", message: "Patient cannot be empty." });
    } else {
      normalized.patientId = patientId;
    }
  }

  if (body.staffId !== undefined || body.therapistId !== undefined) {
    const staffId = (body.staffId ?? body.therapistId)?.trim() ?? "";
    if (!staffId) {
      fields.push({ field: "staffId", message: "Staff cannot be empty." });
    } else {
      normalized.staffId = staffId;
    }
  }

  if (body.appointmentType !== undefined || body.type !== undefined) {
    const appointmentType = (body.appointmentType ?? body.type) as AppointmentType | undefined;
    if (!appointmentType) {
      fields.push({ field: "appointmentType", message: "Appointment type cannot be empty." });
    } else if (!APPOINTMENT_TYPES.includes(appointmentType)) {
      fields.push({
        field: "appointmentType",
        message: "Appointment type must be IN_PERSON or TELEMEDICINE.",
      });
    } else {
      normalized.appointmentType = appointmentType;
    }
  }

  if (body.locationId !== undefined) {
    if (body.locationId === null) {
      normalized.locationId = null;
    } else {
      const locationId = body.locationId.trim();
      normalized.locationId = locationId || null;
    }
  }

  if (body.startTime !== undefined) {
    const startTimeRaw = body.startTime.trim();
    if (!startTimeRaw) {
      fields.push({ field: "startTime", message: "Start time cannot be empty." });
    } else {
      const startTime = new Date(startTimeRaw);
      if (!isValidDate(startTime)) {
        fields.push({ field: "startTime", message: "Start time must be a valid date." });
      } else {
        normalized.startTime = startTime;
      }
    }
  }

  if (body.endTime !== undefined) {
    const endTimeRaw = body.endTime.trim();
    if (!endTimeRaw) {
      fields.push({ field: "endTime", message: "End time cannot be empty." });
    } else {
      const endTime = new Date(endTimeRaw);
      if (!isValidDate(endTime)) {
        fields.push({ field: "endTime", message: "End time must be a valid date." });
      } else {
        normalized.endTime = endTime;
      }
    }
  }

  if (normalized.startTime && normalized.endTime && normalized.endTime <= normalized.startTime) {
    fields.push({ field: "endTime", message: "End time must be after start time." });
  }

  if (body.notes !== undefined) {
    normalized.notes = body.notes === null ? null : body.notes.trim() || null;
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  if (Object.keys(normalized).length === 0) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "At least one field must be provided to update." }],
    };
  }

  return { valid: true, payload: normalized };
}

export const LIST_APPOINTMENT_STATUSES = [
  "SCHEDULED",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
] as const;

export type ListAppointmentStatus = (typeof LIST_APPOINTMENT_STATUSES)[number];

export const LIST_APPOINTMENT_SORT_FIELDS = [
  "startTime",
  "endTime",
  "createdAt",
  "status",
  "type",
] as const;

export type ListAppointmentSortField = (typeof LIST_APPOINTMENT_SORT_FIELDS)[number];

export type ListAppointmentsQuery = {
  page: number;
  limit: number;
  search?: string;
  staffId?: string;
  patientId?: string;
  locationId?: string;
  appointmentType?: AppointmentType;
  status?: ListAppointmentStatus;
  dateStart?: string;
  dateEnd?: string;
  sortBy: ListAppointmentSortField;
  sortOrder: "asc" | "desc";
};

export type ListAppointmentsQueryResult =
  | { valid: true; payload: ListAppointmentsQuery }
  | { valid: false; error: "INVALID_PAGINATION" }
  | { valid: false; error: "INVALID_FILTER" };

function readQueryString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  return undefined;
}

function parsePositiveInt(value: unknown, fallback: number, required = false): number | null {
  if (value === undefined || value === null || value === "") {
    return required ? null : fallback;
  }

  const raw = readQueryString(value);
  if (raw === undefined || raw === "") {
    return required ? null : fallback;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function isValidDateString(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}

export function parseListAppointmentsQuery(query: unknown): ListAppointmentsQueryResult {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const body = query as Record<string, unknown>;
  const hasPage = "page" in body && body.page !== undefined && body.page !== "";
  const hasLimit = "limit" in body && body.limit !== undefined && body.limit !== "";

  const page = parsePositiveInt(body.page, 1, hasPage);
  if (page === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const limit = parsePositiveInt(body.limit, 20, hasLimit);
  if (limit === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const searchRaw = readQueryString(body.search)?.trim();
  const search = searchRaw || undefined;

  const staffId = readQueryString(body.staffId ?? body.therapistId)?.trim() || undefined;
  const patientId = readQueryString(body.patientId)?.trim() || undefined;
  const locationId = readQueryString(body.locationId)?.trim() || undefined;

  let appointmentType: AppointmentType | undefined;
  const appointmentTypeRaw = readQueryString(body.appointmentType ?? body.type)?.trim().toUpperCase();
  if (appointmentTypeRaw) {
    if (!APPOINTMENT_TYPES.includes(appointmentTypeRaw as AppointmentType)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    appointmentType = appointmentTypeRaw as AppointmentType;
  }

  let status: ListAppointmentStatus | undefined;
  const statusRaw = readQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    if (!LIST_APPOINTMENT_STATUSES.includes(statusRaw as ListAppointmentStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = statusRaw as ListAppointmentStatus;
  }

  const dateStart = readQueryString(body.dateStart ?? body.from)?.trim() || undefined;
  const dateEnd = readQueryString(body.dateEnd ?? body.to)?.trim() || undefined;

  if (dateStart && !isValidDateString(dateStart)) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  if (dateEnd && !isValidDateString(dateEnd)) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  const sortByRaw = readQueryString(body.sortBy)?.trim();
  let sortBy: ListAppointmentSortField = "startTime";
  if (sortByRaw) {
    if (!LIST_APPOINTMENT_SORT_FIELDS.includes(sortByRaw as ListAppointmentSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListAppointmentSortField;
  }

  const sortOrderRaw = readQueryString(body.sortOrder)?.trim().toLowerCase();
  let sortOrder: "asc" | "desc" = "desc";
  if (sortOrderRaw) {
    if (sortOrderRaw !== "asc" && sortOrderRaw !== "desc") {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortOrder = sortOrderRaw;
  }

  return {
    valid: true,
    payload: {
      page,
      limit: Math.min(limit, 200),
      search,
      staffId,
      patientId,
      locationId,
      appointmentType,
      status,
      dateStart,
      dateEnd,
      sortBy,
      sortOrder,
    },
  };
}

export const CALENDAR_VIEWS = ["day", "week", "month"] as const;
export type CalendarView = (typeof CALENDAR_VIEWS)[number];

export type CalendarEventsQuery = {
  view: CalendarView;
  date: string;
  staffId?: string;
  locationId?: string;
  appointmentType?: AppointmentType;
  status?: ListAppointmentStatus;
};

export type CalendarEventsQueryResult =
  | { valid: true; payload: CalendarEventsQuery }
  | { valid: false; error: "INVALID_VIEW" }
  | { valid: false; error: "INVALID_DATE" }
  | { valid: false; error: "INVALID_FILTER" };

export function parseCalendarEventsQuery(query: unknown): CalendarEventsQueryResult {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return { valid: false, error: "INVALID_DATE" };
  }

  const body = query as Record<string, unknown>;
  const viewRaw = readQueryString(body.view)?.trim().toLowerCase();
  let view: CalendarView = "week";
  if (viewRaw) {
    if (!CALENDAR_VIEWS.includes(viewRaw as CalendarView)) {
      return { valid: false, error: "INVALID_VIEW" };
    }
    view = viewRaw as CalendarView;
  }

  const dateRaw = readQueryString(body.date)?.trim();
  if (!dateRaw || !isValidDateString(dateRaw)) {
    return { valid: false, error: "INVALID_DATE" };
  }

  const staffId = readQueryString(body.staffId ?? body.therapistId)?.trim() || undefined;
  const locationId = readQueryString(body.locationId)?.trim() || undefined;

  let appointmentType: AppointmentType | undefined;
  const appointmentTypeRaw = readQueryString(body.appointmentType ?? body.type)?.trim().toUpperCase();
  if (appointmentTypeRaw) {
    if (!APPOINTMENT_TYPES.includes(appointmentTypeRaw as AppointmentType)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    appointmentType = appointmentTypeRaw as AppointmentType;
  }

  let status: ListAppointmentStatus | undefined;
  const statusRaw = readQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    if (!LIST_APPOINTMENT_STATUSES.includes(statusRaw as ListAppointmentStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = statusRaw as ListAppointmentStatus;
  }

  return {
    valid: true,
    payload: {
      view,
      date: dateRaw,
      staffId,
      locationId,
      appointmentType,
      status,
    },
  };
}
