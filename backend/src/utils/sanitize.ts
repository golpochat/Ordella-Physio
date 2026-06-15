const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const INJECTION_PATTERNS = [
  /\$\{.*?\}/g,
  /<\s*script/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /(\b)(union\s+select|drop\s+table|insert\s+into|delete\s+from)(\b)/gi,
];

export function sanitizeString(value: string): string {
  let sanitized = value
    .replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char)
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();

  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, "");
  }

  return sanitized;
}

export function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return sanitizeString(value);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const sanitized: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(record)) {
      sanitized[key] = sanitizeValue(nested);
    }
    return sanitized;
  }

  return value;
}
