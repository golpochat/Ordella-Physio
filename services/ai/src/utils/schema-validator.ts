import { invalidSchemaError } from "@/utils/ai-errors";

type JsonSchema = {
  type?: string;
  required?: string[];
  properties?: Record<string, { type?: string }>;
};

export function validateStructuredOutput(data: unknown, schema: Record<string, unknown>) {
  const jsonSchema = schema as JsonSchema;

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw invalidSchemaError();
  }

  const record = data as Record<string, unknown>;
  const required = jsonSchema.required ?? [];

  for (const key of required) {
    if (!(key in record)) {
      throw invalidSchemaError(`Missing required field: ${key}`);
    }
  }

  if (jsonSchema.properties) {
    for (const [key, definition] of Object.entries(jsonSchema.properties)) {
      if (!(key in record) || !definition.type) {
        continue;
      }

      const value = record[key];
      const matches =
        (definition.type === "string" && typeof value === "string") ||
        (definition.type === "number" && typeof value === "number") ||
        (definition.type === "boolean" && typeof value === "boolean") ||
        (definition.type === "array" && Array.isArray(value)) ||
        (definition.type === "object" && typeof value === "object" && value !== null);

      if (!matches) {
        throw invalidSchemaError(`Field ${key} does not match schema type ${definition.type}.`);
      }
    }
  }

  return record;
}
