import { sanitizeInput } from "@ordella/security";

export { sanitizeInput };

export function escapeHtml(value: string): string {
  return sanitizeInput(value);
}
