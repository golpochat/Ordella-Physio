export function normalizeString(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}
