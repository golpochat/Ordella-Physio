import { isSupportedIndexName } from "@/config/search.config";
import type { SearchDocument } from "@/services/providers/search-provider.interface";
import { searchValidationError } from "@/utils/search-errors";

export function validateIndexName(indexName: string) {
  const normalized = indexName.trim().toLowerCase();

  if (!isSupportedIndexName(normalized)) {
    throw searchValidationError([
      {
        field: "indexName",
        message: `indexName must be one of: patients, appointments, invoices, staff, products.`,
      },
    ]);
  }

  return normalized;
}

export function validateIndexRequestBody(body: Record<string, unknown>) {
  if (!body.document || typeof body.document !== "object" || Array.isArray(body.document)) {
    throw searchValidationError([{ field: "document", message: "document object is required." }]);
  }

  return validateIndexDocument(body.document as Record<string, unknown>);
}

export function validateIndexDocument(body: Record<string, unknown>): SearchDocument {
  const fields: Array<{ field: string; message: string }> = [];
  const id = typeof body.id === "string" ? body.id.trim() : "";

  if (!id) {
    fields.push({ field: "id", message: "document.id is required." });
  }

  if (fields.length > 0) {
    throw searchValidationError(fields);
  }

  return {
    ...body,
    id,
  };
}
