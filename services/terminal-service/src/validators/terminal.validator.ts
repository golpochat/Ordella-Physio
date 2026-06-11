import { isIP } from "node:net";
import {
  LIST_TERMINAL_SORT_FIELDS,
  TERMINAL_STATUSES,
  TERMINAL_TYPES,
  type CreateTerminalPayload,
  type ListTerminalSortField,
  type ListTerminalsQuery,
  type TerminalStatus,
  type TerminalType,
  type TerminalValidationFieldError,
  type UpdateTerminalPayload,
} from "@/models/Terminal";

const TERMINAL_CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAC_ADDRESS_REGEX = /^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i;

export type NormalizedCreateTerminalPayload = {
  name: string;
  code: string;
  type: TerminalType;
  locationId: string;
  ipAddress?: string;
  macAddress?: string;
};

export type CreateTerminalValidationResult =
  | { valid: true; payload: NormalizedCreateTerminalPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: TerminalValidationFieldError[] };

export type NormalizedUpdateTerminalPayload = {
  name?: string;
  code?: string;
  type?: TerminalType;
  locationId?: string;
  ipAddress?: string | null;
  macAddress?: string | null;
  status?: TerminalStatus;
};

export type UpdateTerminalValidationResult =
  | { valid: true; payload: NormalizedUpdateTerminalPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: TerminalValidationFieldError[] };

function isValidIpAddress(value: string): boolean {
  return isIP(value) === 4 || isIP(value) === 6;
}

export function validateCreateTerminal(payload: unknown): CreateTerminalValidationResult {
  const fields: TerminalValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as CreateTerminalPayload;
  const name = body.name?.trim() ?? "";
  const code = body.code?.trim().toLowerCase() ?? "";
  const type = body.type;
  const locationId = body.locationId?.trim() ?? "";
  const ipAddress = body.ipAddress?.trim();
  const macAddress = body.macAddress?.trim();

  if (!name) {
    fields.push({ field: "name", message: "Terminal name is required." });
  } else if (name.length < 2) {
    fields.push({ field: "name", message: "Terminal name must be at least 2 characters." });
  }

  if (!code) {
    fields.push({ field: "code", message: "Terminal code is required." });
  } else if (!TERMINAL_CODE_REGEX.test(code)) {
    fields.push({
      field: "code",
      message: "Code must be lowercase and can contain letters, numbers, and hyphens.",
    });
  }

  if (!type) {
    fields.push({ field: "type", message: "Terminal type is required." });
  } else if (!TERMINAL_TYPES.includes(type)) {
    fields.push({ field: "type", message: "Terminal type must be a valid value." });
  }

  if (!locationId) {
    fields.push({ field: "locationId", message: "Location is required." });
  }

  if (ipAddress && !isValidIpAddress(ipAddress)) {
    fields.push({ field: "ipAddress", message: "Enter a valid IP address." });
  }

  if (macAddress && !MAC_ADDRESS_REGEX.test(macAddress)) {
    fields.push({ field: "macAddress", message: "Enter a valid MAC address." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    payload: {
      name,
      code,
      type: type as TerminalType,
      locationId,
      ipAddress: ipAddress || undefined,
      macAddress: macAddress || undefined,
    },
  };
}

export function validateUpdateTerminal(payload: unknown): UpdateTerminalValidationResult {
  const fields: TerminalValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as UpdateTerminalPayload;
  const result: NormalizedUpdateTerminalPayload = {};

  if (body.name !== undefined) {
    const name = body.name.trim();
    if (!name) {
      fields.push({ field: "name", message: "Terminal name is required." });
    } else if (name.length < 2) {
      fields.push({ field: "name", message: "Terminal name must be at least 2 characters." });
    } else {
      result.name = name;
    }
  }

  if (body.code !== undefined) {
    const code = body.code.trim().toLowerCase();
    if (!code) {
      fields.push({ field: "code", message: "Terminal code is required." });
    } else if (!TERMINAL_CODE_REGEX.test(code)) {
      fields.push({
        field: "code",
        message: "Code must be lowercase and can contain letters, numbers, and hyphens.",
      });
    } else {
      result.code = code;
    }
  }

  if (body.type !== undefined) {
    if (!TERMINAL_TYPES.includes(body.type)) {
      fields.push({ field: "type", message: "Terminal type must be a valid value." });
    } else {
      result.type = body.type;
    }
  }

  if (body.locationId !== undefined) {
    const locationId = body.locationId.trim();
    if (!locationId) {
      fields.push({ field: "locationId", message: "Location is required." });
    } else {
      result.locationId = locationId;
    }
  }

  if (body.ipAddress !== undefined) {
    const ipAddress = body.ipAddress?.trim() ?? "";
    if (ipAddress && !isValidIpAddress(ipAddress)) {
      fields.push({ field: "ipAddress", message: "Enter a valid IP address." });
    } else {
      result.ipAddress = ipAddress || null;
    }
  }

  if (body.macAddress !== undefined) {
    const macAddress = body.macAddress?.trim() ?? "";
    if (macAddress && !MAC_ADDRESS_REGEX.test(macAddress)) {
      fields.push({ field: "macAddress", message: "Enter a valid MAC address." });
    } else {
      result.macAddress = macAddress || null;
    }
  }

  if (body.status !== undefined) {
    if (!TERMINAL_STATUSES.includes(body.status)) {
      fields.push({ field: "status", message: 'Status must be "ACTIVE" or "INACTIVE".' });
    } else {
      result.status = body.status;
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return { valid: true, payload: result };
}

export type ListTerminalsQueryResult =
  | { valid: true; payload: ListTerminalsQuery }
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

export function parseListTerminalsQuery(query: unknown): ListTerminalsQueryResult {
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

  let type: TerminalType | undefined;
  const typeRaw = readQueryString(body.type)?.trim().toUpperCase();
  if (typeRaw) {
    if (!TERMINAL_TYPES.includes(typeRaw as TerminalType)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    type = typeRaw as TerminalType;
  }

  let status: TerminalStatus | undefined;
  const statusRaw = readQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    if (!TERMINAL_STATUSES.includes(statusRaw as TerminalStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = statusRaw as TerminalStatus;
  }

  const locationIdRaw = readQueryString(body.locationId)?.trim();
  const locationId = locationIdRaw ? locationIdRaw : undefined;

  const sortByRaw = readQueryString(body.sortBy)?.trim();
  let sortBy: ListTerminalSortField = "createdAt";
  if (sortByRaw) {
    if (!LIST_TERMINAL_SORT_FIELDS.includes(sortByRaw as ListTerminalSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListTerminalSortField;
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
      type,
      status,
      locationId,
      sortBy,
      sortOrder,
    },
  };
}
