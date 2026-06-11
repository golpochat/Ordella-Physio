import type {
  LocationConfigNamespace,
  LocationConfigValidationFieldError,
  LocationOpeningHoursEntry,
} from "@/models/LocationConfig";
import {
  DEFAULT_LOCATION_CONFIGS,
  LOCATION_CONFIG_NAMESPACES,
  WEEKDAYS,
} from "@/models/LocationConfig";

const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{6})$/;
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const IPV4_REGEX =
  /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;

export function isLocationConfigNamespace(value: string): value is LocationConfigNamespace {
  return (LOCATION_CONFIG_NAMESPACES as readonly string[]).includes(value);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateBrandingConfig(data: Record<string, unknown>): LocationConfigValidationFieldError[] {
  const errors: LocationConfigValidationFieldError[] = [];
  const primaryColor = typeof data.primaryColor === "string" ? data.primaryColor.trim() : "";

  if (!primaryColor) {
    errors.push({
      field: "primaryColor",
      message: "Primary color must be a valid hex code.",
    });
  } else if (!HEX_COLOR_REGEX.test(primaryColor)) {
    errors.push({
      field: "primaryColor",
      message: "Primary color must be a valid hex code.",
    });
  }

  if (data.logoUrl !== undefined && data.logoUrl !== null && data.logoUrl !== "") {
    if (typeof data.logoUrl !== "string" || !isValidUrl(data.logoUrl.trim())) {
      errors.push({ field: "logoUrl", message: "Logo URL must be a valid URL." });
    }
  }

  if (typeof data.darkMode !== "boolean") {
    errors.push({ field: "darkMode", message: "Dark mode must be true or false." });
  }

  return errors;
}

function validateOpeningHoursEntry(
  entry: unknown,
  index: number,
): LocationConfigValidationFieldError[] {
  const errors: LocationConfigValidationFieldError[] = [];
  const prefix = `openingHours.${index}`;

  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    errors.push({ field: prefix, message: "Opening hours entry must be an object." });
    return errors;
  }

  const record = entry as Record<string, unknown>;
  const day = typeof record.day === "string" ? record.day.trim().toLowerCase() : "";

  if (!day) {
    errors.push({ field: `${prefix}.day`, message: "Day is required." });
  } else if (!(WEEKDAYS as readonly string[]).includes(day)) {
    errors.push({ field: `${prefix}.day`, message: "Day must be a valid weekday." });
  }

  const open = typeof record.open === "string" ? record.open.trim() : "";
  const close = typeof record.close === "string" ? record.close.trim() : "";

  if (!open || !TIME_REGEX.test(open)) {
    errors.push({ field: `${prefix}.open`, message: "Open time must be in HH:mm format." });
  }

  if (!close || !TIME_REGEX.test(close)) {
    errors.push({ field: `${prefix}.close`, message: "Close time must be in HH:mm format." });
  }

  return errors;
}

function validateOperationsConfig(data: Record<string, unknown>): LocationConfigValidationFieldError[] {
  const errors: LocationConfigValidationFieldError[] = [];

  if (!Array.isArray(data.openingHours)) {
    errors.push({ field: "openingHours", message: "Opening hours must be an array." });
  } else {
    data.openingHours.forEach((entry, index) => {
      errors.push(...validateOpeningHoursEntry(entry, index));
    });
  }

  if (typeof data.maxDailyAppointments !== "number" || !Number.isFinite(data.maxDailyAppointments)) {
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

  return errors;
}

function validateFeaturesConfig(data: Record<string, unknown>): LocationConfigValidationFieldError[] {
  const errors: LocationConfigValidationFieldError[] = [];
  const fields = [
    "enableKioskCheckIn",
    "enableQueueManagement",
    "enableInventoryTracking",
  ] as const;

  for (const field of fields) {
    if (typeof data[field] !== "boolean") {
      errors.push({ field, message: `${field} must be true or false.` });
    }
  }

  return errors;
}

function validateIntegrationsConfig(
  data: Record<string, unknown>,
): LocationConfigValidationFieldError[] {
  const errors: LocationConfigValidationFieldError[] = [];

  if (
    data.posDeviceId !== undefined &&
    data.posDeviceId !== null &&
    data.posDeviceId !== "" &&
    typeof data.posDeviceId !== "string"
  ) {
    errors.push({ field: "posDeviceId", message: "POS device ID must be a string." });
  }

  if (
    data.printerIp !== undefined &&
    data.printerIp !== null &&
    data.printerIp !== ""
  ) {
    const printerIp = typeof data.printerIp === "string" ? data.printerIp.trim() : "";
    if (!IPV4_REGEX.test(printerIp)) {
      errors.push({ field: "printerIp", message: "Printer IP must be a valid IPv4 address." });
    }
  }

  if (
    data.iotGatewayUrl !== undefined &&
    data.iotGatewayUrl !== null &&
    data.iotGatewayUrl !== ""
  ) {
    const iotGatewayUrl =
      typeof data.iotGatewayUrl === "string" ? data.iotGatewayUrl.trim() : "";
    if (!isValidUrl(iotGatewayUrl)) {
      errors.push({ field: "iotGatewayUrl", message: "IoT gateway URL must be a valid URL." });
    }
  }

  return errors;
}

export function validateConfig(
  namespace: LocationConfigNamespace,
  data: unknown,
): LocationConfigValidationFieldError[] {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return [{ field: "data", message: "Configuration data must be a JSON object." }];
  }

  const record = data as Record<string, unknown>;

  switch (namespace) {
    case "branding":
      return validateBrandingConfig(record);
    case "operations":
      return validateOperationsConfig(record);
    case "features":
      return validateFeaturesConfig(record);
    case "integrations":
      return validateIntegrationsConfig(record);
    default:
      return [];
  }
}

function normalizeOpeningHours(data: unknown): LocationOpeningHoursEntry[] {
  if (!Array.isArray(data)) {
    return (DEFAULT_LOCATION_CONFIGS.operations as { openingHours: LocationOpeningHoursEntry[] })
      .openingHours;
  }

  return data.map((entry) => {
    const record = (entry && typeof entry === "object" ? entry : {}) as Record<string, unknown>;
    const day =
      typeof record.day === "string" ? record.day.trim().toLowerCase() : "monday";
    const open = typeof record.open === "string" ? record.open.trim() : "09:00";
    const close = typeof record.close === "string" ? record.close.trim() : "17:00";

    return { day, open, close };
  });
}

export function normalizeConfigData(
  namespace: LocationConfigNamespace,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const defaults = DEFAULT_LOCATION_CONFIGS[namespace] as Record<string, unknown>;
  const merged = { ...defaults, ...data };

  if (namespace === "branding") {
    return {
      primaryColor:
        typeof merged.primaryColor === "string" ? merged.primaryColor.trim() : defaults.primaryColor,
      logoUrl:
        merged.logoUrl === undefined || merged.logoUrl === ""
          ? null
          : typeof merged.logoUrl === "string"
            ? merged.logoUrl.trim()
            : null,
      darkMode: Boolean(merged.darkMode),
    };
  }

  if (namespace === "operations") {
    return {
      openingHours: normalizeOpeningHours(merged.openingHours),
      maxDailyAppointments:
        typeof merged.maxDailyAppointments === "number"
          ? Math.max(0, Math.floor(merged.maxDailyAppointments))
          : defaults.maxDailyAppointments,
      allowWalkIns: Boolean(merged.allowWalkIns),
    };
  }

  if (namespace === "features") {
    return {
      enableKioskCheckIn: Boolean(merged.enableKioskCheckIn),
      enableQueueManagement: Boolean(merged.enableQueueManagement),
      enableInventoryTracking: Boolean(merged.enableInventoryTracking),
    };
  }

  return {
    posDeviceId:
      merged.posDeviceId === undefined || merged.posDeviceId === ""
        ? null
        : typeof merged.posDeviceId === "string"
          ? merged.posDeviceId.trim()
          : null,
    printerIp:
      merged.printerIp === undefined || merged.printerIp === ""
        ? null
        : typeof merged.printerIp === "string"
          ? merged.printerIp.trim()
          : null,
    iotGatewayUrl:
      merged.iotGatewayUrl === undefined || merged.iotGatewayUrl === ""
        ? null
        : typeof merged.iotGatewayUrl === "string"
          ? merged.iotGatewayUrl.trim()
          : null,
  };
}
