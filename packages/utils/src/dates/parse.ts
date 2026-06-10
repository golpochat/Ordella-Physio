import { toDate, type DateInput } from "./format";

export function parseDate(input: string): Date {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Date string cannot be empty");
  }

  const parsed = toDate(trimmed);
  return parsed;
}

export function isPast(date: DateInput, reference: DateInput = new Date()): boolean {
  return toDate(date).getTime() < toDate(reference).getTime();
}

export function isFuture(date: DateInput, reference: DateInput = new Date()): boolean {
  return toDate(date).getTime() > toDate(reference).getTime();
}

export function addDays(date: DateInput, days: number): Date {
  const value = toDate(date);
  const result = new Date(value);
  result.setDate(result.getDate() + days);
  return result;
}

export function startOfDay(date: DateInput): Date {
  const value = toDate(date);
  return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0, 0);
}

export function endOfDay(date: DateInput): Date {
  const value = toDate(date);
  return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 23, 59, 59, 999);
}
