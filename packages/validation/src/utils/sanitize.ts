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
