export const LOCALIZATION_DATE_FORMATS = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"] as const;
export const LOCALIZATION_TIME_FORMATS = ["HH:mm", "hh:mm A"] as const;
export const LOCALIZATION_NUMBER_FORMATS = ["EU", "US"] as const;

export type LocalizationDateFormat = (typeof LOCALIZATION_DATE_FORMATS)[number];
export type LocalizationTimeFormat = (typeof LOCALIZATION_TIME_FORMATS)[number];
export type LocalizationNumberFormat = (typeof LOCALIZATION_NUMBER_FORMATS)[number];

export type TenantLocalizationRecord = {
  id: string;
  tenantId: string;
  timezone: string;
  currency: string;
  dateFormat: LocalizationDateFormat;
  timeFormat: LocalizationTimeFormat;
  numberFormat: LocalizationNumberFormat;
  createdAt: string;
  updatedAt: string;
};

export type UpdateTenantLocalizationPayload = {
  timezone?: string;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
  numberFormat?: string;
};

export type TenantLocalizationValidationFieldError = {
  field: string;
  message: string;
};
