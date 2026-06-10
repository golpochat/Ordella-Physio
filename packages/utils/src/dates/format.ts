export type DateInput = Date | string | number;

export function toDate(date: DateInput): Date {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) {
    throw new Error("Invalid date value");
  }
  return value;
}

const TOKEN_PATTERN =
  /yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s|EEE|EEEE|a/g;

function pad(value: number, length = 2): string {
  return String(value).padStart(length, "0");
}

export function formatDate(date: DateInput, format: string): string {
  const value = toDate(date);

  const replacements: Record<string, string> = {
    yyyy: String(value.getFullYear()),
    yy: String(value.getFullYear()).slice(-2),
    MM: pad(value.getMonth() + 1),
    M: String(value.getMonth() + 1),
    dd: pad(value.getDate()),
    d: String(value.getDate()),
    HH: pad(value.getHours()),
    H: String(value.getHours()),
    mm: pad(value.getMinutes()),
    m: String(value.getMinutes()),
    ss: pad(value.getSeconds()),
    s: String(value.getSeconds()),
    EEEE: value.toLocaleDateString("en-US", { weekday: "long" }),
    EEE: value.toLocaleDateString("en-US", { weekday: "short" }),
    a: value.getHours() >= 12 ? "PM" : "AM",
  };

  return format.replace(TOKEN_PATTERN, (token) => replacements[token] ?? token);
}

export function formatDateTime(date: DateInput, locale = "en-US"): string {
  const value = toDate(date);
  return value.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
