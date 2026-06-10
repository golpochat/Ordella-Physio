import { type ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { sanitizeInput } from "../utils/sanitize";
import { normalizeString } from "../utils/normalize";

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return sanitizeInput(normalizeString(value));
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, sanitizeValue(entry)]),
    );
  }

  return value;
}

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    return sanitizeValue(value);
  }
}

export function createSanitizePipe(): SanitizePipe {
  return new SanitizePipe();
}
