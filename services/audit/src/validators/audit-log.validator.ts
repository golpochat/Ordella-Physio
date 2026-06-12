import type {
  AuditLogSearchFilters,
  AuditLogSortField,
  AuditLogValidationFieldError,
  CreateAuditLogPayload,
  ListAuditLogsQuery,
} from "@/models/AuditLog";
import { isAuditLogSortField } from "@/utils/audit-search-builder";

export type NormalizedCreateAuditLogPayload = {
  tenantId: string;
  actorUserId: string;
  actorRole?: string;
  entityType: string;
  entityId: string;
  action: string;
  metadata?: Record<string, unknown>;
};

export type CreateAuditLogValidationResult =
  | { valid: true; payload: NormalizedCreateAuditLogPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: AuditLogValidationFieldError[] };

export type ListAuditLogsQueryResult =
  | { valid: true; payload: ListAuditLogsQuery }
  | { valid: false; error: "INVALID_PAGINATION" }
  | { valid: false; error: "INVALID_FILTER" }
  | { valid: false; error: "INVALID_DATE_RANGE" };

export type ExportAuditLogsQueryResult =
  | { valid: true; payload: AuditLogSearchFilters }
  | { valid: false; error: "INVALID_FILTER" }
  | { valid: false; error: "INVALID_DATE_RANGE" };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateCreateAuditLog(payload: unknown): CreateAuditLogValidationResult {
  const fields: AuditLogValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as CreateAuditLogPayload;
  const tenantId = body.tenantId?.trim() ?? "";
  const actorUserId = body.actorUserId?.trim() ?? "";
  const actorRole = body.actorRole?.trim();
  const entityType = body.entityType?.trim() ?? "";
  const entityId = body.entityId?.trim() ?? "";
  const action = body.action?.trim() ?? "";

  if (!tenantId) {
    fields.push({ field: "tenantId", message: "tenantId is required." });
  }

  if (!actorUserId) {
    fields.push({ field: "actorUserId", message: "actorUserId is required." });
  }

  if (!entityType) {
    fields.push({ field: "entityType", message: "entityType is required." });
  }

  if (!entityId) {
    fields.push({ field: "entityId", message: "entityId is required." });
  }

  if (!action) {
    fields.push({ field: "action", message: "action is required." });
  }

  if (body.metadata !== undefined && body.metadata !== null && !isPlainObject(body.metadata)) {
    fields.push({ field: "metadata", message: "metadata must be a valid JSON object." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    payload: {
      tenantId,
      actorUserId,
      ...(actorRole ? { actorRole } : {}),
      entityType,
      entityId,
      action,
      ...(isPlainObject(body.metadata) ? { metadata: body.metadata } : {}),
    },
  };
}

function readQueryString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  return undefined;
}

function parseStringArray(value: unknown): string[] | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (Array.isArray(value)) {
    const items = value
      .flatMap((entry) => String(entry).split(","))
      .map((entry) => entry.trim())
      .filter(Boolean);
    return items.length > 0 ? items : undefined;
  }

  const raw = readQueryString(value);
  if (!raw) {
    return undefined;
  }

  const items = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
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

function parseOptionalDate(value: unknown): Date | undefined | null {
  const raw = readQueryString(value)?.trim();
  if (!raw) {
    return undefined;
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function parseSearchFilters(body: Record<string, unknown>): {
  filters: AuditLogSearchFilters;
  error?: "INVALID_FILTER" | "INVALID_DATE_RANGE";
} {
  const keyword = readQueryString(body.keyword)?.trim() || undefined;
  const entityType = readQueryString(body.entityType)?.trim() || undefined;
  const entityTypes = parseStringArray(body.entityTypes);
  const entityId = readQueryString(body.entityId)?.trim() || undefined;
  const action = readQueryString(body.action)?.trim() || undefined;
  const actions = parseStringArray(body.actions);
  const actorUserId = readQueryString(body.actorUserId)?.trim() || undefined;
  const actorUserIds = parseStringArray(body.actorUserIds);

  const dateStart = parseOptionalDate(body.dateStart);
  if (dateStart === null) {
    return { filters: {}, error: "INVALID_DATE_RANGE" };
  }

  const dateEnd = parseOptionalDate(body.dateEnd);
  if (dateEnd === null) {
    return { filters: {}, error: "INVALID_DATE_RANGE" };
  }

  if (dateStart && dateEnd && dateStart > dateEnd) {
    return { filters: {}, error: "INVALID_DATE_RANGE" };
  }

  const sortByRaw = readQueryString(body.sortBy)?.trim();
  let sortBy: AuditLogSortField = "createdAt";
  if (sortByRaw) {
    if (!isAuditLogSortField(sortByRaw)) {
      return { filters: {}, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw;
  }

  const sortOrderRaw = readQueryString(body.sortOrder)?.trim().toLowerCase();
  let sortOrder: "asc" | "desc" = "desc";
  if (sortOrderRaw) {
    if (sortOrderRaw !== "asc" && sortOrderRaw !== "desc") {
      return { filters: {}, error: "INVALID_FILTER" };
    }
    sortOrder = sortOrderRaw;
  }

  return {
    filters: {
      keyword,
      entityType,
      entityTypes,
      entityId,
      action,
      actions,
      actorUserId,
      actorUserIds,
      dateStart,
      dateEnd,
      sortBy,
      sortOrder,
    },
  };
}

export function parseListAuditLogsQuery(query: unknown): ListAuditLogsQueryResult {
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

  const parsedFilters = parseSearchFilters(body);
  if (parsedFilters.error) {
    return { valid: false, error: parsedFilters.error };
  }

  return {
    valid: true,
    payload: {
      page,
      limit: Math.min(limit, 200),
      ...parsedFilters.filters,
    },
  };
}

export function parseExportAuditLogsQuery(query: unknown): ExportAuditLogsQueryResult {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  const parsedFilters = parseSearchFilters(query as Record<string, unknown>);
  if (parsedFilters.error) {
    return { valid: false, error: parsedFilters.error };
  }

  return {
    valid: true,
    payload: parsedFilters.filters,
  };
}
