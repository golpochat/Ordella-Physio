"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useUpdatePlatformTenant } from "@/hooks/useSuperAdminPortal";
import type { PlatformTenant } from "@/lib/super-admin-portal-types";
import { parseTenantUpdateErrors } from "@/lib/tenant-api-errors";
import {
  TENANT_CURRENCY_OPTIONS,
  TENANT_STATUS_OPTIONS,
  TENANT_TIMEZONE_OPTIONS,
} from "@/lib/tenant-form-options";
import {
  validateTenantCode,
  validateTenantCurrency,
  validateTenantName,
  validateTenantTimezone,
} from "@/lib/tenant-form-validation";
import { cn } from "@/lib/cn";

type TenantEditFormProps = {
  tenant: PlatformTenant;
};

export function TenantEditForm({ tenant }: TenantEditFormProps) {
  const updateTenant = useUpdatePlatformTenant(tenant.id);

  const [name, setName] = useState(tenant.name);
  const [code, setCode] = useState(tenant.code ?? tenant.slug);
  const [timezone, setTimezone] = useState(tenant.timezone);
  const [currency, setCurrency] = useState(tenant.currency);
  const [status, setStatus] = useState<"ACTIVE" | "SUSPENDED">(
    tenant.status ?? (tenant.isActive ? "ACTIVE" : "SUSPENDED"),
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setName(tenant.name);
    setCode(tenant.code ?? tenant.slug);
    setTimezone(tenant.timezone);
    setCurrency(tenant.currency);
    setStatus(tenant.status ?? (tenant.isActive ? "ACTIVE" : "SUSPENDED"));
  }, [tenant]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    const nameError = validateTenantName(name);
    if (nameError) errors.name = nameError;

    const codeError = validateTenantCode(code);
    if (codeError) errors.code = codeError;

    const timezoneError = validateTenantTimezone(timezone);
    if (timezoneError) errors.timezone = timezoneError;

    const currencyError = validateTenantCurrency(currency);
    if (currencyError) errors.currency = currencyError;

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit tenant</CardTitle>
        <CardDescription>Update tenant configuration and status.</CardDescription>
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

            updateTenant.mutate(
              {
                name: name.trim(),
                code: code.trim().toLowerCase(),
                timezone,
                currency,
                status,
              },
              {
                onSuccess: () => {
                  toast.success("Tenant updated successfully.");
                },
                onError: (error) => {
                  const parsed = parseTenantUpdateErrors(error);
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
              <Label htmlFor="edit-tenant-name">Tenant name</Label>
              <Input
                id="edit-tenant-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name ? <p className="tenant-create-form-field-error">{fieldErrors.name}</p> : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-tenant-code">Tenant code</Label>
              <Input
                id="edit-tenant-code"
                value={code}
                onChange={(event) => setCode(event.target.value.toLowerCase())}
                aria-invalid={Boolean(fieldErrors.code)}
              />
              {fieldErrors.code ? <p className="tenant-create-form-field-error">{fieldErrors.code}</p> : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-tenant-timezone">Timezone</Label>
              <select
                id="edit-tenant-timezone"
                className="tenant-create-form-select"
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                aria-invalid={Boolean(fieldErrors.timezone)}
              >
                {TENANT_TIMEZONE_OPTIONS.map((option) => (
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
              <Label htmlFor="edit-tenant-currency">Currency</Label>
              <select
                id="edit-tenant-currency"
                className="tenant-create-form-select"
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                aria-invalid={Boolean(fieldErrors.currency)}
              >
                {TENANT_CURRENCY_OPTIONS.map((option) => (
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
              <Label htmlFor="edit-tenant-status">Status</Label>
              <select
                id="edit-tenant-status"
                className={cn("tenant-create-form-select", fieldErrors.status && "tenant-create-form-select-error")}
                value={status}
                onChange={(event) => setStatus(event.target.value as "ACTIVE" | "SUSPENDED")}
                aria-invalid={Boolean(fieldErrors.status)}
              >
                {TENANT_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {fieldErrors.status ? (
                <p className="tenant-create-form-field-error">{fieldErrors.status}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="btn-primary" disabled={updateTenant.isPending}>
            {updateTenant.isPending ? "Saving changes..." : "Save changes"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
