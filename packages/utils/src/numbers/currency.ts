import { roundTo } from "./math";

const DEFAULT_LOCALE = "en-US";

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

export function percentage(part: number, total: number, decimals = 2): number {
  if (total === 0) {
    return 0;
  }
  const value = (part / total) * 100;
  return roundTo(value, decimals);
}
