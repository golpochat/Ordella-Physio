import type { ZodSchema, z } from "zod";
import type { BaseEvent } from "./createEvent";

export type EventValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

function formatZodErrors(error: { issues: Array<{ path: (string | number)[]; message: string }> }): string[] {
  return error.issues.map((issue) => `${issue.path.join(".") || "event"}: ${issue.message}`);
}

export function validateEvent<S extends ZodSchema>(
  event: BaseEvent<unknown>,
  schema: S,
): EventValidationResult<z.output<S>> {
  const parsed = schema.safeParse(event);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatZodErrors(parsed.error),
    };
  }

  return {
    success: true,
    data: parsed.data,
  };
}

export function assertValidEvent<S extends ZodSchema>(
  event: BaseEvent<unknown>,
  schema: S,
): z.output<S> {
  const result = validateEvent(event, schema);

  if (!result.success) {
    throw new Error(`Invalid event:\n${result.errors.join("\n")}`);
  }

  return result.data;
}
