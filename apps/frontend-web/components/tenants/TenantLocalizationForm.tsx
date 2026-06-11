"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useUpdatePlatformTenantLocalization } from "@/hooks/useSuperAdminPortal";
import type { PlatformTenantLocalization } from "@/lib/super-admin-portal-types";
import { parseTenantLocalizationErrors } from "@/lib/tenant-api-errors";
import {
  TENANT_DATE_FORMAT_OPTIONS,
  TENANT_LOCALIZATION_CURRENCY_OPTIONS,
  TENANT_LOCALIZATION_TIMEZONE_OPTIONS,
  TENANT_NUMBER_FORMAT_OPTIONS,
  TENANT_TIME_FORMAT_OPTIONS,
} from "@/lib/tenant-localization-form-options";
import {
  validateLocalizationCurrency,
  validateLocalizationDateFormat,
  validateLocalizationNumberFormat,
  validateLocalizationTimeFormat,
  validateLocalizationTimezone,
} from "@/lib/tenant-localization-form-validation";

type TenantLocalizationFormProps = {
  tenantId: string;
  tenantName: string;
  initialValues: PlatformTenantLocalization;
  onForbidden?: () => void;
};

export function TenantLocalizationForm({
  tenantId,
  tenantName,
  initialValues,
  onForbidden,
}: TenantLocalizationFormProps) {
  const updateLocalization = useUpdatePlatformTenantLocalization(tenantId);

  const [timezone, setTimezone] = useState(initialValues.timezone);
  const [currency, setCurrency] = useState(initialValues.currency);
  const [dateFormat, setDateFormat] = useState(initialValues.dateFormat);
  const [timeFormat, setTimeFormat] = useState(initialValues.timeFormat);
  const [numberFormat, setNumberFormat] = useState<"EU" | "US">(initialValues.numberFormat);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setTimezone(initialValues.timezone);
    setCurrency(initialValues.currency);
    setDateFormat(initialValues.dateFormat);
    setTimeFormat(initialValues.timeFormat);
    setNumberFormat(initialValues.numberFormat);
  }, [initialValues]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    const timezoneError = validateLocalizationTimezone(timezone);
    if (timezoneError) errors.timezone = timezoneError;

    const currencyError = validateLocalizationCurrency(currency);
    if (currencyError) errors.currency = currencyError;

    const dateFormatError = validateLocalizationDateFormat(dateFormat);
    if (dateFormatError) errors.dateFormat = dateFormatError;

    const timeFormatError = validateLocalizationTimeFormat(timeFormat);
    if (timeFormatError) errors.timeFormat = timeFormatError;

    const numberFormatError = validateLocalizationNumberFormat(numberFormat);
    if (numberFormatError) errors.numberFormat = numberFormatError;

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Localization settings</CardTitle>
        <CardDescription>
          Configure timezone, currency, and formatting for {tenantName}.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="tenant-create-form"
          onSubmit={(event) => {
            event.preventDefault();
            setGeneralError(null);

            const clientErrors = validateClient();
            setFieldErrors(clientErrors);
            if (Object.keys(clientErrors).length > 0) {
              return;
            }

            updateLocalization.mutate(
              {
                timezone,
                currency,
                dateFormat,
                timeFormat,
                numberFormat,
              },
              {
                onSuccess: () => {
                  toast.success("Localization settings updated successfully.");
                },
                onError: (error) => {
                  const parsed = parseTenantLocalizationErrors(error);
                  if (parsed.tenantMismatch) {
                    onForbidden?.();
                    return;
                  }
                  setFieldErrors(parsed.fieldErrors);
                  setGeneralError(parsed.generalError);
                },
              },
            );
          }}
        >
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <div className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="localization-timezone">Timezone</Label>
              <select
                id="localization-timezone"
                className="tenant-create-form-select"
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                aria-invalid={Boolean(fieldErrors.timezone)}
              >
                {TENANT_LOCALIZATION_TIMEZONE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {fieldErrors.timezone ? (
                <p className="tenant-create-form-field-error">{fieldErrors.timezone}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="localization-currency">Currency</Label>
              <select
                id="localization-currency"
                className="tenant-create-form-select"
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                aria-invalid={Boolean(fieldErrors.currency)}
              >
                {TENANT_LOCALIZATION_CURRENCY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {fieldErrors.currency ? (
                <p className="tenant-create-form-field-error">{fieldErrors.currency}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="localization-date-format">Date format</Label>
              <select
                id="localization-date-format"
                className="tenant-create-form-select"
                value={dateFormat}
                onChange={(event) =>
                  setDateFormat(event.target.value as PlatformTenantLocalization["dateFormat"])
                }
                aria-invalid={Boolean(fieldErrors.dateFormat)}
              >
                {TENANT_DATE_FORMAT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {fieldErrors.dateFormat ? (
                <p className="tenant-create-form-field-error">{fieldErrors.dateFormat}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="localization-time-format">Time format</Label>
              <select
                id="localization-time-format"
                className="tenant-create-form-select"
                value={timeFormat}
                onChange={(event) =>
                  setTimeFormat(event.target.value as PlatformTenantLocalization["timeFormat"])
                }
                aria-invalid={Boolean(fieldErrors.timeFormat)}
              >
                {TENANT_TIME_FORMAT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {fieldErrors.timeFormat ? (
                <p className="tenant-create-form-field-error">{fieldErrors.timeFormat}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label>Number format</Label>
              <div className="tenant-localization-number-format-toggle">
                {TENANT_NUMBER_FORMAT_OPTIONS.map((option) => (
                  <label key={option.value} className="tenant-localization-number-format-option">
                    <Input
                      type="radio"
                      name="numberFormat"
                      value={option.value}
                      checked={numberFormat === option.value}
                      onChange={() => setNumberFormat(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.numberFormat ? (
                <p className="tenant-create-form-field-error">{fieldErrors.numberFormat}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="btn-primary" disabled={updateLocalization.isPending}>
            {updateLocalization.isPending ? "Saving localization..." : "Save localization settings"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
