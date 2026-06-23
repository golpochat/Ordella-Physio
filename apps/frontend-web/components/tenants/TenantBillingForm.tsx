"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressFormFields } from "@/components/address";
import { Input, Label } from "@/components/ui/input";
import { useUpdatePlatformTenantBilling } from "@/hooks/useSuperAdminPortal";
import type {
  PlatformTenant,
  PlatformTenantBillingSettings,
} from "@/lib/super-admin-portal-types";
import { parseTenantBillingErrors } from "@/lib/tenant-api-errors";
import { TENANT_BILLING_COUNTRY_OPTIONS } from "@/lib/tenant-billing-form-options";
import {
  validateBillingContactName,
  validateBillingDefaultCurrency,
  validateBillingEmail,
  validateInvoicePrefix,
} from "@/lib/tenant-billing-form-validation";
import {
  fromTenantBillingAddress,
  mapPostalErrorsToBillingKeys,
  toTenantBillingAddressPayload,
  validatePostalAddress,
} from "@/lib/postal-address";
import { TENANT_CURRENCY_OPTIONS } from "@/lib/tenant-form-options";
import {
  PLATFORM_DEFAULT_COUNTRY,
  PLATFORM_FALLBACK_CURRENCY,
} from "@/lib/platform-formatting";

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
  const [billingAddress, setBillingAddress] = useState(() =>
    fromTenantBillingAddress({
      billingAddressLine1: initialValues?.billingAddressLine1,
      billingAddressLine2: initialValues?.billingAddressLine2,
      billingCity: initialValues?.billingCity,
      billingPostcode: initialValues?.billingPostcode,
      billingCountry: initialValues?.billingCountry ?? PLATFORM_DEFAULT_COUNTRY,
    }),
  );
  const [taxNumber, setTaxNumber] = useState(initialValues?.taxNumber ?? "");
  const [invoicePrefix, setInvoicePrefix] = useState(initialValues?.invoicePrefix ?? "");
  const [defaultCurrency, setDefaultCurrency] = useState(
    initialValues?.defaultCurrency ?? tenant.currency ?? PLATFORM_FALLBACK_CURRENCY,
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setBillingEmail(initialValues?.billingEmail ?? "");
    setBillingContactName(initialValues?.billingContactName ?? "");
    setBillingAddress(
      fromTenantBillingAddress({
        billingAddressLine1: initialValues?.billingAddressLine1,
        billingAddressLine2: initialValues?.billingAddressLine2,
        billingCity: initialValues?.billingCity,
        billingPostcode: initialValues?.billingPostcode,
        billingCountry: initialValues?.billingCountry ?? PLATFORM_DEFAULT_COUNTRY,
      }),
    );
    setTaxNumber(initialValues?.taxNumber ?? "");
    setInvoicePrefix(initialValues?.invoicePrefix ?? "");
    setDefaultCurrency(
      initialValues?.defaultCurrency ?? tenant.currency ?? PLATFORM_FALLBACK_CURRENCY,
    );
  }, [initialValues, tenant.currency]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    const billingEmailError = validateBillingEmail(billingEmail);
    if (billingEmailError) errors.billingEmail = billingEmailError;

    const billingContactNameError = validateBillingContactName(billingContactName);
    if (billingContactNameError) errors.billingContactName = billingContactNameError;

    Object.assign(errors, mapPostalErrorsToBillingKeys(validatePostalAddress(billingAddress)));

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
                ...toTenantBillingAddressPayload(billingAddress),
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
          {generalError ? <p className="form-error-banner">{generalError}</p> : null}

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
                <p className="form-field-error">{fieldErrors.billingEmail}</p>
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
                <p className="form-field-error">{fieldErrors.billingContactName}</p>
              ) : null}
            </div>

            <AddressFormFields
              idPrefix="billing"
              value={billingAddress}
              onChange={setBillingAddress}
              showLine2
              countryOptions={TENANT_BILLING_COUNTRY_OPTIONS}
              errors={{
                line1: fieldErrors.billingAddressLine1,
                line2: fieldErrors.billingAddressLine2,
                city: fieldErrors.billingCity,
                postalCode: fieldErrors.billingPostcode,
                country: fieldErrors.billingCountry,
              }}
            />

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
                <p className="form-field-error">{fieldErrors.invoicePrefix}</p>
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
                <p className="form-field-error">{fieldErrors.defaultCurrency}</p>
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
