const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function sanitizeInput(input: string): string {
  return input
    .replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char)
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
}

export function capitalize(input: string): string {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function truncate(input: string, length: number, suffix = "..."): string {
  if (length <= 0) return "";
  if (input.length <= length) return input;
  if (suffix.length >= length) return input.slice(0, length);
  return `${input.slice(0, length - suffix.length)}${suffix}`;
}
