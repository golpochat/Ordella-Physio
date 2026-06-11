export type NumberFormatStyle = "EU" | "US";

const DEFAULT_LOCALE = "en-US";

export function resolveLocaleForNumberFormat(numberFormat: NumberFormatStyle): string {
  return numberFormat === "EU" ? "de-DE" : "en-US";
}

export function resolveLocaleForDateFormat(dateFormat: string): string {
  switch (dateFormat) {
    case "DD/MM/YYYY":
      return "en-GB";
    case "MM/DD/YYYY":
      return "en-US";
    default:
      return "sv-SE";
  }
}

export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(
  date: Date | string | number,
  timezone: string,
  format: string,
): string {
  const value = date instanceof Date ? date : new Date(date);
  const locale = resolveLocaleForDateFormat(format);

  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
}

export function formatTime(
  date: Date | string | number,
  timezone: string,
  format: string,
): string {
  const value = date instanceof Date ? date : new Date(date);
  const hour12 = format.toLowerCase().includes("a");

  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  }).format(value);
}

export function formatNumber(value: number, numberFormat: NumberFormatStyle): string {
  const locale = resolveLocaleForNumberFormat(numberFormat);
  return new Intl.NumberFormat(locale).format(value);
}
