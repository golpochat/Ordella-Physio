import type { Request } from "express";

const DEFAULT_REDACT_FIELDS = [
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "secret",
  "apiKey",
  "jwtSecret",
  "stripeSecretKey",
  "stripeWebhookSecret",
] as const;

const REDACTED = "[REDACTED]";

export function getRequestIp(request: Request): string {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() ?? request.ip ?? "unknown";
  }

  return request.ip ?? request.socket.remoteAddress ?? "unknown";
}

export function getUserAgent(request: Request): string {
  const userAgent = request.headers["user-agent"];
  return typeof userAgent === "string" ? userAgent : "unknown";
}

function shouldRedactKey(key: string, fields: string[]): boolean {
  const normalized = key.toLowerCase();
  return fields.some((field) => normalized.includes(field.toLowerCase()));
}

export function redactSensitive<T extends Record<string, unknown>>(
  obj: T,
  fieldsToRedact: string[] = [...DEFAULT_REDACT_FIELDS],
): T {
  const result = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj)) {
    if (shouldRedactKey(key, fieldsToRedact)) {
      result[key] = REDACTED;
      continue;
    }

    if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item && typeof item === "object" && !Array.isArray(item)
          ? redactSensitive(item as Record<string, unknown>, fieldsToRedact)
          : item,
      );
      continue;
    }

    if (value && typeof value === "object") {
      result[key] = redactSensitive(value as Record<string, unknown>, fieldsToRedact);
      continue;
    }

    result[key] = value;
  }

  return result as T;
}

export function safeJsonParse<T = unknown>(
  input: string,
  fallback: T | null = null,
): T | null {
  try {
    return JSON.parse(input) as T;
  } catch {
    return fallback;
  }
}

export function getHeaderValue(
  request: Request,
  headerName: string,
): string | undefined {
  const value =
    request.headers[headerName] ?? request.headers[headerName.toLowerCase()];

  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return undefined;
}
