import { EMAIL_REGEX, PHONE_REGEX } from "@ordella/validation";
import { ISO_COUNTRY_CODES } from "@/validators/tenant-billing.validator";
import {
  LIST_LOCATION_SORT_FIELDS,
  LOCATION_STATUSES,
  type CreateLocationPayload,
  type ListLocationSortField,
  type ListLocationsQuery,
  type LocationStatus,
  type LocationValidationFieldError,
  type UpdateLocationPayload,
} from "@/models/Location";

const LOCATION_CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_COUNTRY_SET = new Set<string>(ISO_COUNTRY_CODES);

export type CreateLocationValidationResult =
  | { valid: true; payload: NormalizedCreateLocationPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: LocationValidationFieldError[] };

export type NormalizedCreateLocationPayload = {
  name: string;
  code: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  timezone: string;
};

function isValidTimezone(value: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

function isValidCountry(value: string): boolean {
  return ISO_COUNTRY_SET.has(value.toUpperCase());
}

export function validateCreateLocation(payload: unknown): CreateLocationValidationResult {
  const fields: LocationValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as CreateLocationPayload;
  const name = body.name?.trim() ?? "";
  const code = body.code?.trim().toLowerCase() ?? "";
  const addressLine1 = body.addressLine1?.trim() ?? "";
  const addressLine2 = body.addressLine2?.trim();
  const city = body.city?.trim() ?? "";
  const state = body.state?.trim();
  const postalCode = body.postalCode?.trim() ?? "";
  const country = body.country?.trim().toUpperCase() ?? "";
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const timezone = body.timezone?.trim() ?? "";

  if (!name) {
    fields.push({ field: "name", message: "Location name is required." });
  } else if (name.length < 2) {
    fields.push({ field: "name", message: "Location name must be at least 2 characters." });
  }

  if (!code) {
    fields.push({ field: "code", message: "Location code is required." });
  } else if (!LOCATION_CODE_REGEX.test(code)) {
    fields.push({
      field: "code",
      message: "Code must be lowercase and can contain letters, numbers, and hyphens.",
    });
  }

  if (!addressLine1) {
    fields.push({ field: "addressLine1", message: "Address is required." });
  }

  if (!city) {
    fields.push({ field: "city", message: "City is required." });
  }

  if (!postalCode) {
    fields.push({ field: "postalCode", message: "Postal code is required." });
  }

  if (!country) {
    fields.push({ field: "country", message: "Country is required." });
  } else if (!isValidCountry(country)) {
    fields.push({ field: "country", message: "Country must be a valid ISO country code." });
  }

  if (!timezone) {
    fields.push({ field: "timezone", message: "Timezone is required." });
  } else if (!isValidTimezone(timezone)) {
    fields.push({ field: "timezone", message: "Timezone must be a valid IANA timezone." });
  }

  if (email && !EMAIL_REGEX.test(email)) {
    fields.push({ field: "email", message: "Enter a valid email." });
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    fields.push({ field: "phone", message: "Enter a valid phone number." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    payload: {
      name,
      code,
      addressLine1,
      addressLine2: addressLine2 || undefined,
      city,
      state: state || undefined,
      postalCode,
      country,
      phone: phone || undefined,
      email: email || undefined,
      timezone,
    },
  };
}

export type UpdateLocationValidationResult =
  | { valid: true; payload: NormalizedUpdateLocationPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: LocationValidationFieldError[] };

export type NormalizedUpdateLocationPayload = {
  name?: string;
  code?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  state?: string | null;
  postalCode?: string;
  country?: string;
  phone?: string | null;
  email?: string | null;
  timezone?: string;
  status?: LocationStatus;
};

export function validateUpdateLocation(payload: unknown): UpdateLocationValidationResult {
  const fields: LocationValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as UpdateLocationPayload;
  const result: NormalizedUpdateLocationPayload = {};

  if (body.name !== undefined) {
    const name = body.name.trim();
    if (!name) {
      fields.push({ field: "name", message: "Location name is required." });
    } else if (name.length < 2) {
      fields.push({ field: "name", message: "Location name must be at least 2 characters." });
    } else {
      result.name = name;
    }
  }

  if (body.code !== undefined) {
    const code = body.code.trim().toLowerCase();
    if (!code) {
      fields.push({ field: "code", message: "Location code is required." });
    } else if (!LOCATION_CODE_REGEX.test(code)) {
      fields.push({
        field: "code",
        message: "Code must be lowercase and can contain letters, numbers, and hyphens.",
      });
    } else {
      result.code = code;
    }
  }

  if (body.addressLine1 !== undefined) {
    const addressLine1 = body.addressLine1.trim();
    if (!addressLine1) {
      fields.push({ field: "addressLine1", message: "Address is required." });
    } else {
      result.addressLine1 = addressLine1;
    }
  }

  if (body.addressLine2 !== undefined) {
    result.addressLine2 = body.addressLine2?.trim() || null;
  }

  if (body.city !== undefined) {
    const city = body.city.trim();
    if (!city) {
      fields.push({ field: "city", message: "City is required." });
    } else {
      result.city = city;
    }
  }

  if (body.state !== undefined) {
    result.state = body.state?.trim() || null;
  }

  if (body.postalCode !== undefined) {
    const postalCode = body.postalCode.trim();
    if (!postalCode) {
      fields.push({ field: "postalCode", message: "Postal code is required." });
    } else {
      result.postalCode = postalCode;
    }
  }

  if (body.country !== undefined) {
    const country = body.country.trim().toUpperCase();
    if (!country) {
      fields.push({ field: "country", message: "Country is required." });
    } else if (!isValidCountry(country)) {
      fields.push({ field: "country", message: "Country must be a valid ISO country code." });
    } else {
      result.country = country;
    }
  }

  if (body.timezone !== undefined) {
    const timezone = body.timezone.trim();
    if (!timezone) {
      fields.push({ field: "timezone", message: "Timezone is required." });
    } else if (!isValidTimezone(timezone)) {
      fields.push({ field: "timezone", message: "Timezone must be a valid IANA timezone." });
    } else {
      result.timezone = timezone;
    }
  }

  if (body.email !== undefined) {
    const email = body.email?.trim() ?? "";
    if (email && !EMAIL_REGEX.test(email)) {
      fields.push({ field: "email", message: "Enter a valid email." });
    } else {
      result.email = email || null;
    }
  }

  if (body.phone !== undefined) {
    const phone = body.phone?.trim() ?? "";
    if (phone && !PHONE_REGEX.test(phone)) {
      fields.push({ field: "phone", message: "Enter a valid phone number." });
    } else {
      result.phone = phone || null;
    }
  }

  if (body.status !== undefined) {
    if (!LOCATION_STATUSES.includes(body.status as LocationStatus)) {
      fields.push({ field: "status", message: 'Status must be "ACTIVE" or "INACTIVE".' });
    } else {
      result.status = body.status as LocationStatus;
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return { valid: true, payload: result };
}

export type ListLocationsQueryResult =
  | { valid: true; payload: ListLocationsQuery }
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

export function parseListLocationsQuery(query: unknown): ListLocationsQueryResult {
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

  const safeLimit = Math.min(limit, 200);
  const searchRaw = readQueryString(body.search)?.trim();
  const search = searchRaw ? searchRaw : undefined;

  let status: LocationStatus | undefined;
  const statusRaw = readQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    if (!LOCATION_STATUSES.includes(statusRaw as LocationStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = statusRaw as LocationStatus;
  }

  const sortByRaw = readQueryString(body.sortBy)?.trim();
  let sortBy: ListLocationSortField = "createdAt";
  if (sortByRaw) {
    if (!LIST_LOCATION_SORT_FIELDS.includes(sortByRaw as ListLocationSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListLocationSortField;
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
      limit: safeLimit,
      search,
      status,
      sortBy,
      sortOrder,
    },
  };
}
