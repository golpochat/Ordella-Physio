import {
  formatCurrency as formatCurrencyShared,
  formatDate as formatDateShared,
  formatNumber as formatNumberShared,
  formatTime as formatTimeShared,
  resolveLocaleForNumberFormat,
  type NumberFormatStyle,
} from "@ordella/shared";
import { useTenantStore } from "@/store/tenant.store";
import type { TenantLocalizationPrefs } from "@/store/tenant.store";

const DEFAULT_LOCALIZATION: TenantLocalizationPrefs = {
  timezone: "UTC",
  currency: "USD",
  dateFormat: "YYYY-MM-DD",
  timeFormat: "HH:mm",
  numberFormat: "US",
};

export function getTenantLocalizationContext(): TenantLocalizationPrefs & { locale: string } {
  const tenant = useTenantStore.getState().tenant;
  const localization = tenant?.localization;
  const numberFormat = localization?.numberFormat ?? DEFAULT_LOCALIZATION.numberFormat;

  return {
    timezone: localization?.timezone ?? tenant?.timezone ?? DEFAULT_LOCALIZATION.timezone,
    currency: localization?.currency ?? tenant?.currency ?? DEFAULT_LOCALIZATION.currency,
    dateFormat: localization?.dateFormat ?? DEFAULT_LOCALIZATION.dateFormat,
    timeFormat: localization?.timeFormat ?? DEFAULT_LOCALIZATION.timeFormat,
    numberFormat,
    locale: resolveLocaleForNumberFormat(numberFormat),
  };
}

export function formatCurrency(amount: number, currency?: string): string {
  const context = getTenantLocalizationContext();
  return formatCurrencyShared(amount, currency ?? context.currency, context.locale);
}

export function formatDate(value: Date | string | number): string {
  const context = getTenantLocalizationContext();
  return formatDateShared(value, context.timezone, context.dateFormat);
}

export function formatTime(value: Date | string | number): string {
  const context = getTenantLocalizationContext();
  return formatTimeShared(value, context.timezone, context.timeFormat);
}

export function formatDateTime(value: Date | string | number): string {
  return `${formatDate(value)} at ${formatTime(value)}`;
}

export function formatNumber(value: number, numberFormat?: NumberFormatStyle): string {
  const context = getTenantLocalizationContext();
  return formatNumberShared(value, numberFormat ?? context.numberFormat);
}
