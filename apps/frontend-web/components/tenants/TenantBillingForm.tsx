"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useUpdatePlatformTenantBilling } from "@/hooks/useSuperAdminPortal";
import type {
  PlatformTenant,
  PlatformTenantBillingSettings,
} from "@/lib/super-admin-portal-types";
import { parseTenantBillingErrors } from "@/lib/tenant-api-errors";
import { TENANT_BILLING_COUNTRY_OPTIONS } from "@/lib/tenant-billing-form-options";
import {
  validateBillingAddressLine1,
  validateBillingCity,
  validateBillingContactName,
  validateBillingCountry,
  validateBillingDefaultCurrency,
  validateBillingEmail,
  validateBillingPostcode,
  validateInvoicePrefix,
} from "@/lib/tenant-billing-form-validation";
import { TENANT_CURRENCY_OPTIONS } from "@/lib/tenant-form-options";

type TenantBillingFormProps = {
  tenant: PlatformTenant;
  initialValues: PlatformTenantBillingSettings | null;
  onForbidden?: () => void;
};

export function TenantBillingForm({ tenant, initialValues, onForbidden }: TenantBillingFormProps) {
  const updateBilling = useUpdatePlatformTenantBilling(tenant.id);

  const [billingEmail, setBillingEmail] = useState(initialValues?.billingEmail ?? "");
  const [billingContactName, setBillingContactName] = useState(
    initialValues?.billingContactName ?? "",
  );
  const [billingAddressLine1, setBillingAddressLine1] = useState(
    initialValues?.billingAddressLine1 ?? "",
  );
  const [billingAddressLine2, setBillingAddressLine2] = useState(
    initialValues?.billingAddressLine2 ?? "",
  );
  const [billingCity, setBillingCity] = useState(initialValues?.billingCity ?? "");
  const [billingPostcode, setBillingPostcode] = useState(initialValues?.billingPostcode ?? "");
  const [billingCountry, setBillingCountry] = useState(initialValues?.billingCountry ?? "GB");
  const [taxNumber, setTaxNumber] = useState(initialValues?.taxNumber ?? "");
  const [invoicePrefix, setInvoicePrefix] = useState(initialValues?.invoicePrefix ?? "");
  const [defaultCurrency, setDefaultCurrency] = useState(
    initialValues?.defaultCurrency ?? tenant.currency ?? "GBP",
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setBillingEmail(initialValues?.billingEmail ?? "");
    setBillingContactName(initialValues?.billingContactName ?? "");
    setBillingAddressLine1(initialValues?.billingAddressLine1 ?? "");
    setBillingAddressLine2(initialValues?.billingAddressLine2 ?? "");
    setBillingCity(initialValues?.billingCity ?? "");
    setBillingPostcode(initialValues?.billingPostcode ?? "");
    setBillingCountry(initialValues?.billingCountry ?? "GB");
    setTaxNumber(initialValues?.taxNumber ?? "");
    setInvoicePrefix(initialValues?.invoicePrefix ?? "");
    setDefaultCurrency(initialValues?.defaultCurrency ?? tenant.currency ?? "GBP");
  }, [initialValues, tenant.currency]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    const billingEmailError = validateBillingEmail(billingEmail);
    if (billingEmailError) errors.billingEmail = billingEmailError;

    const billingContactNameError = validateBillingContactName(billingContactName);
    if (billingContactNameError) errors.billingContactName = billingContactNameError;

    const billingAddressLine1Error = validateBillingAddressLine1(billingAddressLine1);
    if (billingAddressLine1Error) errors.billingAddressLine1 = billingAddressLine1Error;

    const billingCityError = validateBillingCity(billingCity);
    if (billingCityError) errors.billingCity = billingCityError;

    const billingPostcodeError = validateBillingPostcode(billingPostcode);
    if (billingPostcodeError) errors.billingPostcode = billingPostcodeError;

    const billingCountryError = validateBillingCountry(billingCountry);
    if (billingCountryError) errors.billingCountry = billingCountryError;

    const defaultCurrencyError = validateBillingDefaultCurrency(defaultCurrency);
    if (defaultCurrencyError) errors.defaultCurrency = defaultCurrencyError;

    const invoicePrefixError = validateInvoicePrefix(invoicePrefix);
    if (invoicePrefixError) errors.invoicePrefix = invoicePrefixError;

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing settings</CardTitle>
        <CardDescription>
          Configure invoice and billing contact details for {tenant.name}.
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

            updateBilling.mutate(
              {
                billingEmail: billingEmail.trim(),
                billingContactName: billingContactName.trim(),
                billingAddressLine1: billingAddressLine1.trim(),
                billingAddressLine2: billingAddressLine2.trim() || null,
                billingCity: billingCity.trim(),
                billingPostcode: billingPostcode.trim(),
                billingCountry,
                taxNumber: taxNumber.trim() || null,
                invoicePrefix: invoicePrefix.trim().toUpperCase() || null,
                defaultCurrency,
              },
              {
                onSuccess: () => {
                  toast.success("Billing settings updated successfully.");
                },
                onError: (error) => {
                  const parsed = parseTenantBillingErrors(error);
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
              <Label htmlFor="billing-email">Billing email</Label>
              <Input
                id="billing-email"
                type="email"
                value={billingEmail}
                onChange={(event) => setBillingEmail(event.target.value)}
                aria-invalid={Boolean(fieldErrors.billingEmail)}
              />
              {fieldErrors.billingEmail ? (
                <p className="tenant-create-form-field-error">{fieldErrors.billingEmail}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-contact-name">Billing contact name</Label>
              <Input
                id="billing-contact-name"
                value={billingContactName}
                onChange={(event) => setBillingContactName(event.target.value)}
                aria-invalid={Boolean(fieldErrors.billingContactName)}
              />
              {fieldErrors.billingContactName ? (
                <p className="tenant-create-form-field-error">{fieldErrors.billingContactName}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-address-line-1">Address line 1</Label>
              <Input
                id="billing-address-line-1"
                value={billingAddressLine1}
                onChange={(event) => setBillingAddressLine1(event.target.value)}
                aria-invalid={Boolean(fieldErrors.billingAddressLine1)}
              />
              {fieldErrors.billingAddressLine1 ? (
                <p className="tenant-create-form-field-error">{fieldErrors.billingAddressLine1}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-address-line-2">Address line 2</Label>
              <Input
                id="billing-address-line-2"
                value={billingAddressLine2}
                onChange={(event) => setBillingAddressLine2(event.target.value)}
              />
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-city">City</Label>
              <Input
                id="billing-city"
                value={billingCity}
                onChange={(event) => setBillingCity(event.target.value)}
                aria-invalid={Boolean(fieldErrors.billingCity)}
              />
              {fieldErrors.billingCity ? (
                <p className="tenant-create-form-field-error">{fieldErrors.billingCity}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-postcode">Postcode</Label>
              <Input
                id="billing-postcode"
                value={billingPostcode}
                onChange={(event) => setBillingPostcode(event.target.value)}
                aria-invalid={Boolean(fieldErrors.billingPostcode)}
              />
              {fieldErrors.billingPostcode ? (
                <p className="tenant-create-form-field-error">{fieldErrors.billingPostcode}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-country">Country</Label>
              <select
                id="billing-country"
                className="tenant-create-form-select"
                value={billingCountry}
                onChange={(event) => setBillingCountry(event.target.value)}
                aria-invalid={Boolean(fieldErrors.billingCountry)}
              >
                {TENANT_BILLING_COUNTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {fieldErrors.billingCountry ? (
                <p className="tenant-create-form-field-error">{fieldErrors.billingCountry}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-tax-number">Tax number</Label>
              <Input
                id="billing-tax-number"
                value={taxNumber}
                onChange={(event) => setTaxNumber(event.target.value)}
              />
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-invoice-prefix">Invoice prefix</Label>
              <Input
                id="billing-invoice-prefix"
                value={invoicePrefix}
                onChange={(event) => setInvoicePrefix(event.target.value.toUpperCase())}
                aria-invalid={Boolean(fieldErrors.invoicePrefix)}
              />
              {fieldErrors.invoicePrefix ? (
                <p className="tenant-create-form-field-error">{fieldErrors.invoicePrefix}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="billing-default-currency">Default currency</Label>
              <select
                id="billing-default-currency"
                className="tenant-create-form-select"
                value={defaultCurrency}
                onChange={(event) => setDefaultCurrency(event.target.value)}
                aria-invalid={Boolean(fieldErrors.defaultCurrency)}
              >
                {TENANT_CURRENCY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {fieldErrors.defaultCurrency ? (
                <p className="tenant-create-form-field-error">{fieldErrors.defaultCurrency}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="btn-primary" disabled={updateBilling.isPending}>
            {updateBilling.isPending ? "Saving billing settings..." : "Save billing settings"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
