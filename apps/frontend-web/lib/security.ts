const MAX_LENGTHS = {
  name: 120,
  email: 254,
  clinicName: 160,
  message: 5000,
} as const;

export function sanitizeString(value: string, maxLength = 5000): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_LENGTHS.email;
}

export function isHoneypotTripped(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 0);
}

const BOT_USER_AGENT_PATTERN =
  /(bot|crawler|spider|scraper|curl|wget|python-requests|httpclient|headless)/i;

export function isSuspiciousBot(userAgent: string | null | undefined): boolean {
  if (!userAgent || userAgent.trim().length < 10) {
    return true;
  }

  return BOT_USER_AGENT_PATTERN.test(userAgent);
}

export type ContactPayload = {
  name: string;
  email: string;
  clinicName: string;
  message: string;
  website?: string;
};

export function parseContactPayload(body: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;

  if (isHoneypotTripped(typeof record.website === "string" ? record.website : "")) {
    return { ok: false, error: "Bot detected" };
  }

  const name = sanitizeString(String(record.name ?? ""), MAX_LENGTHS.name);
  const email = sanitizeString(String(record.email ?? ""), MAX_LENGTHS.email);
  const clinicName = sanitizeString(String(record.clinicName ?? ""), MAX_LENGTHS.clinicName);
  const message = sanitizeString(String(record.message ?? ""), MAX_LENGTHS.message);

  if (!name) {
    return { ok: false, error: "Name is required" };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Invalid email" };
  }

  if (!message) {
    return { ok: false, error: "Message is required" };
  }

  return {
    ok: true,
    data: { name, email, clinicName, message },
  };
}
