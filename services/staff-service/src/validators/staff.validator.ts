import { EMAIL_REGEX, PHONE_REGEX } from "@ordella/validation";
import {
  LIST_STAFF_SORT_FIELDS,
  STAFF_STATUSES,
  STAFF_TYPES,
  type CreateStaffPayload,
  type ListStaffQuery,
  type ListStaffSortField,
  type StaffStatus,
  type StaffType,
  type StaffValidationFieldError,
  type UpdateStaffPayload,
} from "@/models/Staff";

export type NormalizedCreateStaffPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  staffType: StaffType;
  roleId: string;
  locations: string[];
  status: StaffStatus;
};

export type CreateStaffValidationResult =
  | { valid: true; payload: NormalizedCreateStaffPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: StaffValidationFieldError[] };

export function validateCreateStaff(payload: unknown): CreateStaffValidationResult {
  const fields: StaffValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as CreateStaffPayload;
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim();
  const staffType = body.staffType;
  const roleId = body.roleId?.trim() ?? "";
  const locations = Array.isArray(body.locations) ? body.locations : [];
  const status = body.status ?? "ACTIVE";

  if (!firstName) {
    fields.push({ field: "firstName", message: "First name is required." });
  } else if (firstName.length < 2) {
    fields.push({ field: "firstName", message: "First name must be at least 2 characters." });
  }

  if (!lastName) {
    fields.push({ field: "lastName", message: "Last name is required." });
  } else if (lastName.length < 2) {
    fields.push({ field: "lastName", message: "Last name must be at least 2 characters." });
  }

  if (!email) {
    fields.push({ field: "email", message: "Email is required." });
  } else if (!EMAIL_REGEX.test(email)) {
    fields.push({ field: "email", message: "Enter a valid email address." });
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    fields.push({ field: "phone", message: "Enter a valid phone number." });
  }

  if (!staffType) {
    fields.push({ field: "staffType", message: "Staff type is required." });
  } else if (!STAFF_TYPES.includes(staffType)) {
    fields.push({ field: "staffType", message: "Staff type must be a valid value." });
  }

  if (!roleId) {
    fields.push({ field: "roleId", message: "Role is required." });
  }

  const normalizedLocations: string[] = [];
  for (const entry of locations) {
    if (typeof entry !== "string" || !entry.trim()) {
      fields.push({ field: "locations", message: "Each location must be a valid id." });
      continue;
    }
    normalizedLocations.push(entry.trim());
  }

  const uniqueLocations = [...new Set(normalizedLocations)];
  if (uniqueLocations.length === 0) {
    fields.push({ field: "locations", message: "Select at least one location." });
  }

  if (status && !STAFF_STATUSES.includes(status)) {
    fields.push({ field: "status", message: "Status must be ACTIVE or INACTIVE." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    payload: {
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      staffType: staffType as StaffType,
      roleId,
      locations: uniqueLocations,
      status: status as StaffStatus,
    },
  };
}

export type NormalizedUpdateStaffPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  staffType?: StaffType;
  roleId?: string;
  locations?: string[];
  status?: StaffStatus;
};

export type UpdateStaffValidationResult =
  | { valid: true; payload: NormalizedUpdateStaffPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: StaffValidationFieldError[] };

export function validateUpdateStaff(payload: unknown): UpdateStaffValidationResult {
  const fields: StaffValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as UpdateStaffPayload;
  const result: NormalizedUpdateStaffPayload = {};

  if (body.firstName !== undefined) {
    const firstName = body.firstName.trim();
    if (!firstName) {
      fields.push({ field: "firstName", message: "First name is required." });
    } else if (firstName.length < 2) {
      fields.push({ field: "firstName", message: "First name must be at least 2 characters." });
    } else {
      result.firstName = firstName;
    }
  }

  if (body.lastName !== undefined) {
    const lastName = body.lastName.trim();
    if (!lastName) {
      fields.push({ field: "lastName", message: "Last name is required." });
    } else if (lastName.length < 2) {
      fields.push({ field: "lastName", message: "Last name must be at least 2 characters." });
    } else {
      result.lastName = lastName;
    }
  }

  if (body.email !== undefined) {
    const email = body.email.trim().toLowerCase();
    if (!email) {
      fields.push({ field: "email", message: "Email is required." });
    } else if (!EMAIL_REGEX.test(email)) {
      fields.push({ field: "email", message: "Enter a valid email address." });
    } else {
      result.email = email;
    }
  }

  if (body.phone !== undefined) {
    if (body.phone === null) {
      result.phone = null;
    } else {
      const phone = body.phone.trim();
      if (phone && !PHONE_REGEX.test(phone)) {
        fields.push({ field: "phone", message: "Enter a valid phone number." });
      } else {
        result.phone = phone || null;
      }
    }
  }

  if (body.staffType !== undefined) {
    if (!STAFF_TYPES.includes(body.staffType)) {
      fields.push({ field: "staffType", message: "Staff type must be a valid value." });
    } else {
      result.staffType = body.staffType;
    }
  }

  if (body.roleId !== undefined) {
    const roleId = body.roleId.trim();
    if (!roleId) {
      fields.push({ field: "roleId", message: "Role is required." });
    } else {
      result.roleId = roleId;
    }
  }

  if (body.locations !== undefined) {
    if (!Array.isArray(body.locations)) {
      fields.push({ field: "locations", message: "Locations must be an array." });
    } else {
      const normalizedLocations: string[] = [];
      for (const entry of body.locations) {
        if (typeof entry !== "string" || !entry.trim()) {
          fields.push({ field: "locations", message: "Each location must be a valid id." });
          continue;
        }
        normalizedLocations.push(entry.trim());
      }

      const uniqueLocations = [...new Set(normalizedLocations)];
      if (!fields.some((field) => field.field === "locations") && uniqueLocations.length === 0) {
        fields.push({ field: "locations", message: "Select at least one location." });
      } else if (!fields.some((field) => field.field === "locations")) {
        result.locations = uniqueLocations;
      }
    }
  }

  if (body.status !== undefined) {
    if (!STAFF_STATUSES.includes(body.status)) {
      fields.push({ field: "status", message: "Status must be ACTIVE or INACTIVE." });
    } else {
      result.status = body.status;
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  if (
    result.firstName === undefined &&
    result.lastName === undefined &&
    result.email === undefined &&
    result.phone === undefined &&
    result.staffType === undefined &&
    result.roleId === undefined &&
    result.locations === undefined &&
    result.status === undefined
  ) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "At least one field must be provided to update." }],
    };
  }

  return { valid: true, payload: result };
}

export type ListStaffQueryResult =
  | { valid: true; payload: ListStaffQuery }
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

export function parseListStaffQuery(query: unknown): ListStaffQueryResult {
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

  let staffType: StaffType | undefined;
  const staffTypeRaw = readQueryString(body.staffType)?.trim().toUpperCase();
  if (staffTypeRaw) {
    if (!STAFF_TYPES.includes(staffTypeRaw as StaffType)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    staffType = staffTypeRaw as StaffType;
  }

  let status: StaffStatus | undefined;
  const statusRaw = readQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    if (!STAFF_STATUSES.includes(statusRaw as StaffStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = statusRaw as StaffStatus;
  }

  const roleIdRaw = readQueryString(body.roleId)?.trim();
  const roleId = roleIdRaw ? roleIdRaw : undefined;

  const locationIdRaw = readQueryString(body.locationId)?.trim();
  const locationId = locationIdRaw ? locationIdRaw : undefined;

  const sortByRaw = readQueryString(body.sortBy)?.trim();
  let sortBy: ListStaffSortField = "createdAt";
  if (sortByRaw) {
    if (!LIST_STAFF_SORT_FIELDS.includes(sortByRaw as ListStaffSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListStaffSortField;
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
      staffType,
      roleId,
      locationId,
      status,
      sortBy,
      sortOrder,
    },
  };
}
