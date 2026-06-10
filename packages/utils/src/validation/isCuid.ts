const CUID_PATTERN = /^c[a-z0-9]{24,}$/i;

export function isCuid(input: string): boolean {
  return CUID_PATTERN.test(input.trim());
}

export function isNumeric(input: string): boolean {
  return input.trim() !== "" && Number.isFinite(Number(input));
}
