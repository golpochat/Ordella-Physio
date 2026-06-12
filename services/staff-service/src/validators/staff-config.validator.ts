import type {
  StaffConfigNamespace,
  StaffConfigValidationFieldError,
} from "@/models/StaffConfig";
import {
  DEFAULT_STAFF_CONFIGS,
  STAFF_CONFIG_NAMESPACES,
  STAFF_CONFIG_WEEKDAYS,
} from "@/models/StaffConfig";

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const ISO_LANGUAGE_REGEX = /^[a-z]{2}(-[A-Z]{2})?$/;

export function isStaffConfigNamespace(value: string): value is StaffConfigNamespace {
  return (STAFF_CONFIG_NAMESPACES as readonly string[]).includes(value);
}

function isValidTimezone(value: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE_REGEX.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function validatePreferencesConfig(data: Record<string, unknown>): StaffConfigValidationFieldError[] {
  const errors: StaffConfigValidationFieldError[] = [];

  if (data.language !== undefined && data.language !== null && data.language !== "") {
    const language = typeof data.language === "string" ? data.language.trim() : "";
    if (!language || !ISO_LANGUAGE_REGEX.test(language)) {
      errors.push({ field: "language", message: "Language must be a valid ISO code." });
    }
  }

  if (data.timezone !== undefined && data.timezone !== null && data.timezone !== "") {
    const timezone = typeof data.timezone === "string" ? data.timezone.trim() : "";
    if (!timezone || !isValidTimezone(timezone)) {
      errors.push({ field: "timezone", message: "Timezone must be a valid IANA timezone." });
    }
  }

  if (!data.notifications || typeof data.notifications !== "object" || Array.isArray(data.notifications)) {
    errors.push({ field: "notifications", message: "Notifications must be an object." });
    return errors;
  }

  const notifications = data.notifications as Record<string, unknown>;
  for (const field of ["email", "sms", "push"] as const) {
    if (typeof notifications[field] !== "boolean") {
      errors.push({
        field: `notifications.${field}`,
        message: `${field} notification must be true or false.`,
      });
    }
  }

  return errors;
}

function validateWeeklyScheduleEntry(
  entry: unknown,
  index: number,
): StaffConfigValidationFieldError[] {
  const errors: StaffConfigValidationFieldError[] = [];
  const prefix = `weeklySchedule.${index}`;

  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    errors.push({ field: prefix, message: "Schedule entry must be an object." });
    return errors;
  }

  const record = entry as Record<string, unknown>;
  const day = typeof record.day === "string" ? record.day.trim().toLowerCase() : "";

  if (!day) {
    errors.push({ field: `${prefix}.day`, message: "Day is required." });
  } else if (!(STAFF_CONFIG_WEEKDAYS as readonly string[]).includes(day)) {
    errors.push({ field: `${prefix}.day`, message: "Day must be a valid weekday." });
  }

  const start = typeof record.start === "string" ? record.start.trim() : "";
  const end = typeof record.end === "string" ? record.end.trim() : "";

  if (!start || !TIME_REGEX.test(start)) {
    errors.push({ field: `${prefix}.start`, message: "Start time must be in HH:mm format." });
  }

  if (!end || !TIME_REGEX.test(end)) {
    errors.push({ field: `${prefix}.end`, message: "End time must be in HH:mm format." });
  }

  return errors;
}

function validateBreakTimeEntry(
  entry: unknown,
  index: number,
): StaffConfigValidationFieldError[] {
  const errors: StaffConfigValidationFieldError[] = [];
  const prefix = `breakTimes.${index}`;

  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    errors.push({ field: prefix, message: "Break time entry must be an object." });
    return errors;
  }

  const record = entry as Record<string, unknown>;
  const start = typeof record.start === "string" ? record.start.trim() : "";
  const end = typeof record.end === "string" ? record.end.trim() : "";

  if (!start || !TIME_REGEX.test(start)) {
    errors.push({ field: `${prefix}.start`, message: "Start time must be in HH:mm format." });
  }

  if (!end || !TIME_REGEX.test(end)) {
    errors.push({ field: `${prefix}.end`, message: "End time must be in HH:mm format." });
  }

  return errors;
}

function validateWorkingHoursConfig(data: Record<string, unknown>): StaffConfigValidationFieldError[] {
  const errors: StaffConfigValidationFieldError[] = [];

  if (!Array.isArray(data.weeklySchedule)) {
    errors.push({ field: "weeklySchedule", message: "Weekly schedule must be an array." });
  } else {
    data.weeklySchedule.forEach((entry, index) => {
      errors.push(...validateWeeklyScheduleEntry(entry, index));
    });
  }

  if (!Array.isArray(data.breakTimes)) {
    errors.push({ field: "breakTimes", message: "Break times must be an array." });
  } else {
    data.breakTimes.forEach((entry, index) => {
      errors.push(...validateBreakTimeEntry(entry, index));
    });
  }

  return errors;
}

function validateFeaturesConfig(data: Record<string, unknown>): StaffConfigValidationFieldError[] {
  const errors: StaffConfigValidationFieldError[] = [];
  const fields = ["enableTelehealth", "enableOverbooking", "enableAutoAssign"] as const;

  for (const field of fields) {
    if (typeof data[field] !== "boolean") {
      errors.push({ field, message: `${field} must be true or false.` });
    }
  }

  return errors;
}

function validateRestrictionsConfig(data: Record<string, unknown>): StaffConfigValidationFieldError[] {
  const errors: StaffConfigValidationFieldError[] = [];

  if (
    typeof data.maxDailyAppointments !== "number" ||
    !Number.isFinite(data.maxDailyAppointments)
  ) {
    errors.push({
      field: "maxDailyAppointments",
      message: "Max daily appointments must be a number.",
    });
  } else if (data.maxDailyAppointments < 0) {
    errors.push({
      field: "maxDailyAppointments",
      message: "Max daily appointments must be zero or greater.",
    });
  }

  if (typeof data.allowWalkIns !== "boolean") {
    errors.push({ field: "allowWalkIns", message: "Allow walk-ins must be true or false." });
  }

  if (!Array.isArray(data.blockedDates)) {
    errors.push({ field: "blockedDates", message: "Blocked dates must be an array." });
  } else {
    data.blockedDates.forEach((value, index) => {
      if (typeof value !== "string" || !isValidIsoDate(value.trim())) {
        errors.push({
          field: `blockedDates.${index}`,
          message: "Blocked date must be a valid ISO date (YYYY-MM-DD).",
        });
      }
    });
  }

  return errors;
}

export function validateConfig(
  namespace: StaffConfigNamespace,
  data: unknown,
): StaffConfigValidationFieldError[] {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return [{ field: "data", message: "Configuration data must be a JSON object." }];
  }

  const record = data as Record<string, unknown>;

  switch (namespace) {
    case "preferences":
      return validatePreferencesConfig(record);
    case "workingHours":
      return validateWorkingHoursConfig(record);
    case "features":
      return validateFeaturesConfig(record);
    case "restrictions":
      return validateRestrictionsConfig(record);
    default:
      return [];
  }
}

export function normalizeConfigData(
  namespace: StaffConfigNamespace,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const defaults = DEFAULT_STAFF_CONFIGS[namespace] as Record<string, unknown>;
  const merged = { ...defaults, ...data };

  if (namespace === "preferences") {
    const notifications =
      merged.notifications && typeof merged.notifications === "object" && !Array.isArray(merged.notifications)
        ? (merged.notifications as Record<string, unknown>)
        : (defaults.notifications as Record<string, unknown>);

    return {
      language:
        merged.language === undefined || merged.language === ""
          ? defaults.language
          : typeof merged.language === "string"
            ? merged.language.trim()
            : defaults.language,
      timezone:
        merged.timezone === undefined || merged.timezone === ""
          ? defaults.timezone
          : typeof merged.timezone === "string"
            ? merged.timezone.trim()
            : defaults.timezone,
      notifications: {
        email: Boolean(notifications.email),
        sms: Boolean(notifications.sms),
        push: Boolean(notifications.push),
      },
    };
  }

  if (namespace === "workingHours") {
    const weeklySchedule = Array.isArray(merged.weeklySchedule)
      ? merged.weeklySchedule.map((entry) => {
          const record =
            entry && typeof entry === "object" && !Array.isArray(entry)
              ? (entry as Record<string, unknown>)
              : {};
          const day =
            typeof record.day === "string"
              ? record.day.trim().toLowerCase()
              : "monday";
          return {
            day,
            start: typeof record.start === "string" ? record.start.trim() : "09:00",
            end: typeof record.end === "string" ? record.end.trim() : "17:00",
          };
        })
      : (defaults.weeklySchedule as unknown[]);

    const breakTimes = Array.isArray(merged.breakTimes)
      ? merged.breakTimes.map((entry) => {
          const record =
            entry && typeof entry === "object" && !Array.isArray(entry)
              ? (entry as Record<string, unknown>)
              : {};
          return {
            start: typeof record.start === "string" ? record.start.trim() : "12:00",
            end: typeof record.end === "string" ? record.end.trim() : "13:00",
          };
        })
      : [];

    return { weeklySchedule, breakTimes };
  }

  if (namespace === "features") {
    return {
      enableTelehealth: Boolean(merged.enableTelehealth),
      enableOverbooking: Boolean(merged.enableOverbooking),
      enableAutoAssign: Boolean(merged.enableAutoAssign),
    };
  }

  const blockedDates = Array.isArray(merged.blockedDates)
    ? merged.blockedDates
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter((value) => isValidIsoDate(value))
    : [];

  return {
    maxDailyAppointments:
      typeof merged.maxDailyAppointments === "number" && Number.isFinite(merged.maxDailyAppointments)
        ? merged.maxDailyAppointments
        : defaults.maxDailyAppointments,
    allowWalkIns: Boolean(merged.allowWalkIns),
    blockedDates,
  };
}
