const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/;

export function isPhone(input: string): boolean {
  const normalized = input.replace(/[\s()-]/g, "");
  return PHONE_PATTERN.test(normalized);
}
