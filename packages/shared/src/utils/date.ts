export function toIsoDate(date: Date | string | number): string {
  const value = date instanceof Date ? date : new Date(date);
  return value.toISOString();
}

export function toDateOnlyString(date: Date | string | number): string {
  return toIsoDate(date).slice(0, 10);
}

export function parseIsoDate(value: string): Date {
  return new Date(value);
}

export function isValidIsoDate(value: string): boolean {
  const parsed = Date.parse(value);
  return !Number.isNaN(parsed);
}

export function startOfDayUtc(date: Date | string | number): string {
  const value = date instanceof Date ? new Date(date) : new Date(date);
  value.setUTCHours(0, 0, 0, 0);
  return value.toISOString();
}

export function endOfDayUtc(date: Date | string | number): string {
  const value = date instanceof Date ? new Date(date) : new Date(date);
  value.setUTCHours(23, 59, 59, 999);
  return value.toISOString();
}
