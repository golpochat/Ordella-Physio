"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreatePlatformTenant, usePlatformUsers } from "@/hooks/useSuperAdminPortal";
import { TENANT_CURRENCY_OPTIONS, TENANT_TIMEZONE_OPTIONS } from "@/lib/tenant-form-options";
import { parseTenantCreateErrors } from "@/lib/tenant-api-errors";
import { cn } from "@/lib/cn";

function slugifyCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function TenantCreateForm() {
  const router = useRouter();
  const createTenant = useCreatePlatformTenant();
  const { data: users = [] } = usePlatformUsers();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeTouched, setCodeTouched] = useState(false);
  const [ownerUserId, setOwnerUserId] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Tenant name is required";
    }

    if (!code.trim()) {
      errors.code = "Tenant code is required";
    } else if (!CODE_REGEX.test(code.trim())) {
      errors.code = "Tenant code must be lowercase and can contain letters, numbers, and hyphens";
    }

    if (!ownerUserId) {
      errors.ownerUserId = "Owner is required";
    }

    if (!timezone) {
      errors.timezone = "Timezone is required";
    }

    if (!currency) {
      errors.currency = "Currency is required";
    }

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create tenant</CardTitle>
        <CardDescription>Provision a new clinic tenant on the platform.</CardDescription>
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

            createTenant.mutate(
              {
                name: name.trim(),
                code: code.trim().toLowerCase(),
                ownerUserId,
                timezone,
                currency,
              },
              {
                onSuccess: () => {
                  toast.success("Tenant created successfully.");
                  router.push("/super-admin/tenants");
                },
                onError: (error) => {
                  const parsed = parseTenantCreateErrors(error);
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
              <Label htmlFor="tenant-name">Tenant name</Label>
              <Input
                id="tenant-name"
                value={name}
                onChange={(event) => {
                  const nextName = event.target.value;
                  setName(nextName);
                  if (!codeTouched) {
                    setCode(slugifyCode(nextName));
                  }
                }}
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name ? <p className="tenant-create-form-field-error">{fieldErrors.name}</p> : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="tenant-code">Tenant code</Label>
              <Input
                id="tenant-code"
                value={code}
                onChange={(event) => {
                  setCodeTouched(true);
                  setCode(event.target.value.toLowerCase());
                }}
                aria-invalid={Boolean(fieldErrors.code)}
              />
              {fieldErrors.code ? <p className="tenant-create-form-field-error">{fieldErrors.code}</p> : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="tenant-owner">Owner</Label>
              <select
                id="tenant-owner"
                className={cn("tenant-create-form-select", fieldErrors.ownerUserId && "tenant-create-form-select-error")}
                value={ownerUserId}
                onChange={(event) => setOwnerUserId(event.target.value)}
                aria-invalid={Boolean(fieldErrors.ownerUserId)}
              >
                <option value="">Select owner</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {[user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || user.id}
                    {user.email ? ` (${user.email})` : ""}
                  </option>
                ))}
              </select>
              {fieldErrors.ownerUserId ? (
                <p className="tenant-create-form-field-error">{fieldErrors.ownerUserId}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="tenant-timezone">Timezone</Label>
              <select
                id="tenant-timezone"
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
              <Label htmlFor="tenant-currency">Currency</Label>
              <select
                id="tenant-currency"
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
          </div>

          <Button type="submit" className="btn-primary" disabled={createTenant.isPending}>
            {createTenant.isPending ? "Creating tenant..." : "Create tenant"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
