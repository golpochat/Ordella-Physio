import { EMAIL_REGEX, PHONE_REGEX } from "@ordella/validation";
import {
  LIST_ORGANIZATION_SORT_FIELDS,
  ORGANIZATION_STATUSES,
  type CreateOrganizationPayload,
  type ListOrganizationSortField,
  type ListOrganizationsQuery,
  type OrganizationStatus,
  type OrganizationValidationFieldError,
  type UpdateOrganizationPayload,
} from "@/models/Organization";

const ORGANIZATION_CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CreateOrganizationValidationResult =
  | { valid: true; payload: NormalizedCreateOrganizationPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: OrganizationValidationFieldError[] };

export type NormalizedCreateOrganizationPayload = {
  name: string;
  code: string;
  description?: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone?: string;
  tenantId?: string;
};

export type UpdateOrganizationValidationResult =
  | { valid: true; payload: NormalizedUpdateOrganizationPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: OrganizationValidationFieldError[] };

export type NormalizedUpdateOrganizationPayload = {
  name?: string;
  code?: string;
  description?: string | null;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string | null;
  status?: OrganizationStatus;
};

function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value);
}

function isValidPhone(value: string): boolean {
  return PHONE_REGEX.test(value);
}

export function validateCreateOrganization(payload: unknown): CreateOrganizationValidationResult {
  const fields: OrganizationValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as CreateOrganizationPayload;
  const name = body.name?.trim() ?? "";
  const code = body.code?.trim().toLowerCase() ?? "";
  const description = body.description?.trim();
  const primaryContactName = body.primaryContactName?.trim() ?? "";
  const primaryContactEmail = body.primaryContactEmail?.trim() ?? "";
  const primaryContactPhone = body.primaryContactPhone?.trim();
  const tenantId = body.tenantId?.trim();

  if (!name) {
    fields.push({ field: "name", message: "Organization name is required." });
  } else if (name.length < 3) {
    fields.push({ field: "name", message: "Organization name must be at least 3 characters." });
  }

  if (!code) {
    fields.push({ field: "code", message: "Organization code is required." });
  } else if (!ORGANIZATION_CODE_REGEX.test(code)) {
    fields.push({
      field: "code",
      message: "Code must be lowercase and can contain letters, numbers, and hyphens.",
    });
  }

  if (!primaryContactName) {
    fields.push({ field: "primaryContactName", message: "Primary contact name is required." });
  }

  if (!primaryContactEmail) {
    fields.push({ field: "primaryContactEmail", message: "Primary contact email is required." });
  } else if (!isValidEmail(primaryContactEmail)) {
    fields.push({ field: "primaryContactEmail", message: "Enter a valid email." });
  }

  if (primaryContactPhone && !isValidPhone(primaryContactPhone)) {
    fields.push({ field: "primaryContactPhone", message: "Enter a valid phone number." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    payload: {
      name,
      code,
      description: description || undefined,
      primaryContactName,
      primaryContactEmail,
      primaryContactPhone: primaryContactPhone || undefined,
      tenantId: tenantId || undefined,
    },
  };
}

export function validateUpdateOrganization(payload: unknown): UpdateOrganizationValidationResult {
  const fields: OrganizationValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as UpdateOrganizationPayload;
  const result: NormalizedUpdateOrganizationPayload = {};

  if (body.name !== undefined) {
    const name = body.name.trim();
    if (!name) {
      fields.push({ field: "name", message: "Organization name is required." });
    } else if (name.length < 3) {
      fields.push({ field: "name", message: "Organization name must be at least 3 characters." });
    } else {
      result.name = name;
    }
  }

  if (body.code !== undefined) {
    const code = body.code.trim().toLowerCase();
    if (!code) {
      fields.push({ field: "code", message: "Organization code is required." });
    } else if (!ORGANIZATION_CODE_REGEX.test(code)) {
      fields.push({
        field: "code",
        message: "Code must be lowercase and can contain letters, numbers, and hyphens.",
      });
    } else {
      result.code = code;
    }
  }

  if (body.description !== undefined) {
    result.description = body.description?.trim() || null;
  }

  if (body.primaryContactName !== undefined) {
    const primaryContactName = body.primaryContactName.trim();
    if (!primaryContactName) {
      fields.push({ field: "primaryContactName", message: "Primary contact name is required." });
    } else {
      result.primaryContactName = primaryContactName;
    }
  }

  if (body.primaryContactEmail !== undefined) {
    const primaryContactEmail = body.primaryContactEmail.trim();
    if (!primaryContactEmail) {
      fields.push({ field: "primaryContactEmail", message: "Primary contact email is required." });
    } else if (!isValidEmail(primaryContactEmail)) {
      fields.push({ field: "primaryContactEmail", message: "Enter a valid email." });
    } else {
      result.primaryContactEmail = primaryContactEmail;
    }
  }

  if (body.primaryContactPhone !== undefined) {
    const primaryContactPhone = body.primaryContactPhone?.trim() ?? "";
    if (primaryContactPhone && !isValidPhone(primaryContactPhone)) {
      fields.push({ field: "primaryContactPhone", message: "Enter a valid phone number." });
    } else {
      result.primaryContactPhone = primaryContactPhone || null;
    }
  }

  if (body.status !== undefined) {
    if (!ORGANIZATION_STATUSES.includes(body.status as OrganizationStatus)) {
      fields.push({ field: "status", message: 'Status must be "ACTIVE" or "INACTIVE".' });
    } else {
      result.status = body.status as OrganizationStatus;
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return { valid: true, payload: result };
}

export type ListOrganizationsQueryResult =
  | { valid: true; payload: ListOrganizationsQuery }
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

function parsePositiveInt(
  value: unknown,
  fallback: number,
  required = false,
): number | null {
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

export function parseListOrganizationsQuery(query: unknown): ListOrganizationsQueryResult {
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

  let status: OrganizationStatus | undefined;
  const statusRaw = readQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    if (!ORGANIZATION_STATUSES.includes(statusRaw as OrganizationStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = statusRaw as OrganizationStatus;
  }

  const sortByRaw = readQueryString(body.sortBy)?.trim();
  let sortBy: ListOrganizationSortField = "createdAt";
  if (sortByRaw) {
    if (!LIST_ORGANIZATION_SORT_FIELDS.includes(sortByRaw as ListOrganizationSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListOrganizationSortField;
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
