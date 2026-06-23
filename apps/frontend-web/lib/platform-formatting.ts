/** Platform-wide currency defaults (matches pricing / Stripe local wiring). */
export const PLATFORM_FALLBACK_CURRENCY = "EUR";

/** Map ISO currency to a sensible Intl locale for display. */
export function resolveLocaleForCurrency(currency: string): string {
  switch (currency.toUpperCase()) {
    case "EUR":
      return "en-IE";
    case "GBP":
      return "en-GB";
    case "USD":
      return "en-US";
    default:
      return "en-US";
  }
}

/** Format Stripe amounts stored in minor units (cents) using platform currency. */
export function formatPlatformCurrencyCents(
  cents: number,
  currency: string = PLATFORM_FALLBACK_CURRENCY,
  maximumFractionDigits = 0,
): string {
  const code = currency.toUpperCase();

  return new Intl.NumberFormat(resolveLocaleForCurrency(code), {
    style: "currency",
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(cents / 100);
}
