import { DEFAULT_SEARCH_LIMIT, MAX_SEARCH_LIMIT } from "@/config/search.config";
import { invalidSearchQueryError } from "@/utils/search-errors";

function readString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return undefined;
}

function readPositiveInt(value: unknown, fallback: number, max: number) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw invalidSearchQueryError();
  }

  return Math.min(parsed, max);
}

function readFilters(value: unknown): Record<string, unknown> | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      throw invalidSearchQueryError();
    }
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  throw invalidSearchQueryError();
}

export function validateSearchQuery(query: Record<string, unknown>) {
  const q = readString(query.q);
  if (!q) {
    throw invalidSearchQueryError("Search query q is required.");
  }

  return {
    q,
    limit: readPositiveInt(query.limit, DEFAULT_SEARCH_LIMIT, MAX_SEARCH_LIMIT),
    offset: readPositiveInt(query.offset, 0, 10_000),
    filters: readFilters(query.filters),
  };
}

export function validateAutocompleteQuery(query: Record<string, unknown>) {
  const prefix = readString(query.prefix);
  if (!prefix) {
    throw invalidSearchQueryError("Autocomplete prefix is required.");
  }

  return {
    prefix,
    limit: readPositiveInt(query.limit, 10, MAX_SEARCH_LIMIT),
  };
}
