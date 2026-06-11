import { TENANT_CURRENCY_OPTIONS, TENANT_TIMEZONE_OPTIONS } from "@/lib/tenant-form-options";

export const TENANT_LOCALIZATION_TIMEZONE_OPTIONS = TENANT_TIMEZONE_OPTIONS;

export const TENANT_LOCALIZATION_CURRENCY_OPTIONS = TENANT_CURRENCY_OPTIONS;

export const TENANT_DATE_FORMAT_OPTIONS = [
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
] as const;

export const TENANT_TIME_FORMAT_OPTIONS = [
  { value: "HH:mm", label: "24-hour (HH:mm)" },
  { value: "hh:mm A", label: "12-hour (hh:mm AM/PM)" },
] as const;

export const TENANT_NUMBER_FORMAT_OPTIONS = [
  { value: "US", label: "US (1,234.56)" },
  { value: "EU", label: "EU (1.234,56)" },
] as const;
