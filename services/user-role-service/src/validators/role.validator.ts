import type {
  CreateRolePayload,
  ListRoleSortField,
  ListRolesQuery,
  RoleValidationFieldError,
  UpdateRolePayload,
} from "@/models/Role";

const LIST_ROLE_SORT_FIELDS: ListRoleSortField[] = [
  "createdAt",
  "name",
  "code",
  "isSystem",
  "updatedAt",
];

const ROLE_CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type NormalizedCreateRolePayload = {
  name: string;
  code: string;
  description?: string;
  permissions: string[];
};

export type CreateRoleValidationResult =
  | { valid: true; payload: NormalizedCreateRolePayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: RoleValidationFieldError[] };

export function validateCreateRole(payload: unknown): CreateRoleValidationResult {
  const fields: RoleValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as CreateRolePayload;
  const name = body.name?.trim() ?? "";
  const code = body.code?.trim().toLowerCase() ?? "";
  const description = body.description?.trim();
  const permissions = Array.isArray(body.permissions) ? body.permissions : [];

  if (!name) {
    fields.push({ field: "name", message: "Role name is required." });
  } else if (name.length < 2) {
    fields.push({ field: "name", message: "Role name must be at least 2 characters." });
  }

  if (!code) {
    fields.push({ field: "code", message: "Role code is required." });
  } else if (!ROLE_CODE_REGEX.test(code)) {
    fields.push({
      field: "code",
      message: "Code must be lowercase and can contain letters, numbers, and hyphens.",
    });
  }

  const normalizedPermissions: string[] = [];
  for (const entry of permissions) {
    if (typeof entry !== "string" || !entry.trim()) {
      fields.push({ field: "permissions", message: "Each permission must be a non-empty code." });
      continue;
    }
    normalizedPermissions.push(entry.trim());
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
      permissions: [...new Set(normalizedPermissions)],
    },
  };
}

export type NormalizedUpdateRolePayload = {
  name?: string;
  code?: string;
  description?: string | null;
  permissions?: string[];
};

export type UpdateRoleValidationResult =
  | { valid: true; payload: NormalizedUpdateRolePayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: RoleValidationFieldError[] };

export function validateUpdateRole(payload: unknown): UpdateRoleValidationResult {
  const fields: RoleValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as UpdateRolePayload;
  const result: NormalizedUpdateRolePayload = {};

  if (body.name !== undefined) {
    const name = body.name.trim();
    if (!name) {
      fields.push({ field: "name", message: "Role name is required." });
    } else if (name.length < 2) {
      fields.push({ field: "name", message: "Role name must be at least 2 characters." });
    } else {
      result.name = name;
    }
  }

  if (body.code !== undefined) {
    const code = body.code.trim().toLowerCase();
    if (!code) {
      fields.push({ field: "code", message: "Role code is required." });
    } else if (!ROLE_CODE_REGEX.test(code)) {
      fields.push({
        field: "code",
        message: "Code must be lowercase and can contain letters, numbers, and hyphens.",
      });
    } else {
      result.code = code;
    }
  }

  if (body.description !== undefined) {
    if (body.description === null) {
      result.description = null;
    } else {
      const description = body.description.trim();
      result.description = description || null;
    }
  }

  if (body.permissions !== undefined) {
    if (!Array.isArray(body.permissions)) {
      fields.push({ field: "permissions", message: "Permissions must be an array." });
    } else {
      const normalizedPermissions: string[] = [];
      for (const entry of body.permissions) {
        if (typeof entry !== "string" || !entry.trim()) {
          fields.push({ field: "permissions", message: "Each permission must be a non-empty code." });
          continue;
        }
        normalizedPermissions.push(entry.trim());
      }
      if (!fields.some((field) => field.field === "permissions")) {
        result.permissions = [...new Set(normalizedPermissions)];
      }
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  if (
    result.name === undefined &&
    result.code === undefined &&
    result.description === undefined &&
    result.permissions === undefined
  ) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "At least one field must be provided to update." }],
    };
  }

  return { valid: true, payload: result };
}

export type ListRolesQueryResult =
  | { valid: true; payload: ListRolesQuery }
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

function parseOptionalBoolean(value: unknown): boolean | undefined | null {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const raw = readQueryString(value)?.trim().toLowerCase();
  if (!raw) {
    return undefined;
  }

  if (raw === "true" || raw === "1") {
    return true;
  }

  if (raw === "false" || raw === "0") {
    return false;
  }

  return null;
}

export function parseListRolesQuery(query: unknown): ListRolesQueryResult {
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

  const isSystemParsed = parseOptionalBoolean(body.isSystem);
  if (isSystemParsed === null) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  const sortByRaw = readQueryString(body.sortBy)?.trim();
  let sortBy: ListRoleSortField = "createdAt";
  if (sortByRaw) {
    if (!LIST_ROLE_SORT_FIELDS.includes(sortByRaw as ListRoleSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListRoleSortField;
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
      isSystem: isSystemParsed,
      sortBy,
      sortOrder,
    },
  };
}
