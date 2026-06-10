import { toDate, type DateInput } from "./format";

export function toTimezone(date: DateInput, timezone: string): Date {
  const value = toDate(date);
  const localized = value.toLocaleString("en-US", { timeZone: timezone });
  return new Date(localized);
}

export function formatInTimezone(
  date: DateInput,
  timezone: string,
  locale = "en-US",
): string {
  return toDate(date).toLocaleString(locale, { timeZone: timezone });
}
