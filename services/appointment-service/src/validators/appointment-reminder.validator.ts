import {
  MAX_REMINDER_OFFSET_MINUTES,
  REMINDER_CHANNELS,
  REMINDER_STATUSES,
  type CreateAppointmentReminderPayload,
  type ReminderChannel,
  type ReminderStatus,
  type UpdateAppointmentReminderPayload,
  type AppointmentReminderValidationFieldError,
} from "@/models/AppointmentReminder";

export type CreateReminderValidationResult =
  | { valid: true; payload: Required<Pick<CreateAppointmentReminderPayload, "channel" | "offsetMinutes">> & { staffId?: string } }
  | { valid: false; fields: AppointmentReminderValidationFieldError[] };

export type UpdateReminderValidationResult =
  | { valid: true; payload: UpdateAppointmentReminderPayload }
  | { valid: false; fields: AppointmentReminderValidationFieldError[] };

function parsePositiveInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

function validateOffsetMinutes(
  value: unknown,
  required: boolean,
): { value?: number; error?: AppointmentReminderValidationFieldError } {
  if (value === undefined || value === null || value === "") {
    if (required) {
      return { error: { field: "offsetMinutes", message: "Offset must be greater than 0." } };
    }
    return {};
  }

  const parsed = parsePositiveInt(value);
  if (parsed === null) {
    return { error: { field: "offsetMinutes", message: "Offset must be greater than 0." } };
  }

  if (parsed > MAX_REMINDER_OFFSET_MINUTES) {
    return {
      error: {
        field: "offsetMinutes",
        message: "Offset cannot be more than 7 days before the appointment.",
      },
    };
  }

  return { value: parsed };
}

function validateChannel(
  value: unknown,
  required: boolean,
): { value?: ReminderChannel; error?: AppointmentReminderValidationFieldError } {
  if (value === undefined || value === null || value === "") {
    if (required) {
      return { error: { field: "channel", message: "Channel is required." } };
    }
    return {};
  }

  const normalized = String(value).trim().toUpperCase();
  if (!REMINDER_CHANNELS.includes(normalized as ReminderChannel)) {
    return { error: { field: "channel", message: "Channel must be EMAIL, SMS, or PUSH." } };
  }

  return { value: normalized as ReminderChannel };
}

export function validateCreateReminder(payload: unknown): CreateReminderValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      fields: [{ field: "payload", message: "Request body must be an object." }],
    };
  }

  const body = payload as Record<string, unknown>;
  const fields: AppointmentReminderValidationFieldError[] = [];

  const channelResult = validateChannel(body.channel, true);
  if (channelResult.error) {
    fields.push(channelResult.error);
  }

  const offsetResult = validateOffsetMinutes(body.offsetMinutes, true);
  if (offsetResult.error) {
    fields.push(offsetResult.error);
  }

  if (fields.length > 0) {
    return { valid: false, fields };
  }

  const staffId =
    typeof body.staffId === "string" && body.staffId.trim() ? body.staffId.trim() : undefined;

  return {
    valid: true,
    payload: {
      channel: channelResult.value!,
      offsetMinutes: offsetResult.value!,
      staffId,
    },
  };
}

export function validateUpdateReminder(payload: unknown): UpdateReminderValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      fields: [{ field: "payload", message: "Request body must be an object." }],
    };
  }

  const body = payload as Record<string, unknown>;
  const fields: AppointmentReminderValidationFieldError[] = [];
  const normalized: UpdateAppointmentReminderPayload = {};

  if ("channel" in body) {
    const channelResult = validateChannel(body.channel, false);
    if (channelResult.error) {
      fields.push(channelResult.error);
    } else if (channelResult.value) {
      normalized.channel = channelResult.value;
    }
  }

  if ("offsetMinutes" in body) {
    const offsetResult = validateOffsetMinutes(body.offsetMinutes, false);
    if (offsetResult.error) {
      fields.push(offsetResult.error);
    } else if (offsetResult.value) {
      normalized.offsetMinutes = offsetResult.value;
    }
  }

  if ("status" in body && body.status !== undefined && body.status !== null && body.status !== "") {
    const status = String(body.status).trim().toUpperCase();
    if (!REMINDER_STATUSES.includes(status as ReminderStatus)) {
      fields.push({ field: "status", message: "Status must be SCHEDULED, SENT, CANCELLED, or FAILED." });
    } else if (status !== "CANCELLED") {
      fields.push({ field: "status", message: "Only cancelling reminders is supported via the API." });
    } else {
      normalized.status = status as ReminderStatus;
    }
  }

  if (fields.length > 0) {
    return { valid: false, fields };
  }

  if (
    normalized.channel === undefined &&
    normalized.offsetMinutes === undefined &&
    normalized.status === undefined
  ) {
    return {
      valid: false,
      fields: [{ field: "payload", message: "At least one field must be provided to update." }],
    };
  }

  return { valid: true, payload: normalized };
}
