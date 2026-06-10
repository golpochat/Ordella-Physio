const DEFAULT_REDACTED_FIELDS = [
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "secret",
  "apiKey",
  "jwtSecret",
  "stripeSecretKey",
] as const;

const REDACTED_VALUE = "[REDACTED]";

function shouldRedactKey(key: string, fieldsToRedact: string[]): boolean {
  const normalized = key.toLowerCase();
  return fieldsToRedact.some((field) => normalized.includes(field.toLowerCase()));
}

export function redact<T extends Record<string, unknown>>(
  obj: T,
  fieldsToRedact: string[] = [...DEFAULT_REDACTED_FIELDS],
): T {
  const result = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj)) {
    if (shouldRedactKey(key, fieldsToRedact)) {
      result[key] = REDACTED_VALUE;
      continue;
    }

    if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item && typeof item === "object" && !Array.isArray(item)
          ? redact(item as Record<string, unknown>, fieldsToRedact)
          : item,
      );
      continue;
    }

    if (value && typeof value === "object") {
      result[key] = redact(value as Record<string, unknown>, fieldsToRedact);
      continue;
    }

    result[key] = value;
  }

  return result as T;
}
