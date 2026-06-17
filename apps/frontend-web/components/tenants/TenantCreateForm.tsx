"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  useCreatePlatformTenant,
  usePlatformOrganizations,
  usePlatformUsers,
} from "@/hooks/useSuperAdminPortal";
import { TENANT_CURRENCY_OPTIONS, TENANT_TIMEZONE_OPTIONS } from "@/lib/tenant-form-options";
import { parseTenantCreateErrors } from "@/lib/tenant-api-errors";
import {
  validateTenantCurrency,
  validateTenantName,
  validateTenantOwnerSelection,
  validateTenantTimezone,
} from "@/lib/tenant-form-validation";
import { cn } from "@/lib/cn";
import type { CreatePlatformTenantResponse } from "@/lib/super-admin-portal-types";

type OwnerMode = "existing" | "email";

type SuccessSummary = {
  organizationName: string;
  tenantName: string;
  tenantCode: string;
  ownerEmail: string;
};

export function TenantCreateForm() {
  const router = useRouter();
  const createTenant = useCreatePlatformTenant();
  const organizationsQuery = usePlatformOrganizations({ limit: 200, page: 1 });
  const organizations = organizationsQuery.data?.data ?? [];
  const { data: usersResponse } = usePlatformUsers({ limit: 100, page: 1 });
  const users = usersResponse?.data ?? [];

  const [tenantName, setTenantName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [ownerMode, setOwnerMode] = useState<OwnerMode>("email");
  const [ownerUserId, setOwnerUserId] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successSummary, setSuccessSummary] = useState<SuccessSummary | null>(null);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    const nameError = validateTenantName(tenantName);
    if (nameError) errors.tenantName = nameError;

    if (!organizationId) {
      errors.organizationId = "Organization is required";
    }

    Object.assign(
      errors,
      validateTenantOwnerSelection({ mode: ownerMode, ownerUserId, ownerEmail }),
    );

    const timezoneError = validateTenantTimezone(timezone);
    if (timezoneError) errors.timezone = timezoneError;

    const currencyError = validateTenantCurrency(currency);
    if (currencyError) errors.currency = currencyError;

    return errors;
  }

  if (successSummary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tenant provisioned</CardTitle>
          <CardDescription>Owner assignment and tenant defaults are complete.</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          <dl className="tenant-create-form-success-summary">
            <div>
              <dt>Organization</dt>
              <dd>{successSummary.organizationName}</dd>
            </div>
            <div>
              <dt>Tenant</dt>
              <dd>{successSummary.tenantName}</dd>
            </div>
            <div>
              <dt>Tenant code</dt>
              <dd>
                <code>{successSummary.tenantCode}</code>
              </dd>
            </div>
            <div>
              <dt>Owner email</dt>
              <dd>{successSummary.ownerEmail}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <Button type="button" className="btn-primary" onClick={() => router.push("/super-admin/tenants")}>
              View tenants
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/super-admin/organizations")}>
              View organizations
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create tenant</CardTitle>
        <CardDescription>Provision a clinic workspace and assign its owner in one step.</CardDescription>
      </CardHeader>
      <CardBody>
        {organizations.length === 0 ? (
          <div className="tenant-create-form-empty-state">
            <p>Create an organization before provisioning a tenant.</p>
            <Button asChild className="btn-primary">
              <Link href="/super-admin/organizations/new">Create organization</Link>
            </Button>
          </div>
        ) : (
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

              const payload =
                ownerMode === "existing"
                  ? {
                      tenantName: tenantName.trim(),
                      organizationId,
                      ownerUserId,
                      timezone,
                      currency,
                    }
                  : {
                      tenantName: tenantName.trim(),
                      organizationId,
                      ownerEmail: ownerEmail.trim().toLowerCase(),
                      timezone,
                      currency,
                    };

              createTenant.mutate(payload, {
                onSuccess: (response) => {
                  const result = response as CreatePlatformTenantResponse;
                  setSuccessSummary({
                    organizationName: result.organizationName,
                    tenantName: result.tenantName,
                    tenantCode: result.tenant.tenantCode ?? result.tenant.code,
                    ownerEmail: result.ownerEmail,
                  });
                },
                onError: (error) => {
                  const parsed = parseTenantCreateErrors(error);
                  setFieldErrors(parsed.fieldErrors);
                  setGeneralError(parsed.generalError);
                },
              });
            }}
          >
            {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

            <fieldset className="tenant-create-form-section">
              <legend className="tenant-create-form-section-title">Tenant identity</legend>
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="tenant-name">Tenant name</Label>
                  <Input
                    id="tenant-name"
                    value={tenantName}
                    onChange={(event) => setTenantName(event.target.value)}
                    aria-invalid={Boolean(fieldErrors.tenantName)}
                  />
                  {fieldErrors.tenantName ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.tenantName}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="tenant-organization">Organization</Label>
                  <select
                    id="tenant-organization"
                    className={cn(
                      "tenant-create-form-select",
                      fieldErrors.organizationId && "tenant-create-form-select-error",
                    )}
                    value={organizationId}
                    onChange={(event) => setOrganizationId(event.target.value)}
                    aria-invalid={Boolean(fieldErrors.organizationId)}
                  >
                    <option value="">Select organization</option>
                    {organizations.map((organization) => (
                      <option key={organization.id} value={organization.id}>
                        {organization.name}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.organizationId ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.organizationId}</p>
                  ) : null}
                </div>
              </div>
            </fieldset>

            <fieldset className="tenant-create-form-section">
              <legend className="tenant-create-form-section-title">Regional settings</legend>
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="tenant-timezone">Timezone</Label>
                  <select
                    id="tenant-timezone"
                    className={cn(
                      "tenant-create-form-select",
                      fieldErrors.timezone && "tenant-create-form-select-error",
                    )}
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
                    className={cn(
                      "tenant-create-form-select",
                      fieldErrors.currency && "tenant-create-form-select-error",
                    )}
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
            </fieldset>

            <fieldset className="tenant-create-form-section">
              <legend className="tenant-create-form-section-title">Tenant owner</legend>
              <div className="tenant-create-form-owner-mode">
                <label className="tenant-create-form-owner-mode-option">
                  <input
                    type="radio"
                    name="owner-mode"
                    value="email"
                    checked={ownerMode === "email"}
                    onChange={() => {
                      setOwnerMode("email");
                      setOwnerUserId("");
                      setFieldErrors((current) => {
                        const next = { ...current };
                        delete next.ownerUserId;
                        return next;
                      });
                    }}
                  />
                  <span>Invite new owner by email</span>
                </label>
                <label className="tenant-create-form-owner-mode-option">
                  <input
                    type="radio"
                    name="owner-mode"
                    value="existing"
                    checked={ownerMode === "existing"}
                    onChange={() => {
                      setOwnerMode("existing");
                      setOwnerEmail("");
                      setFieldErrors((current) => {
                        const next = { ...current };
                        delete next.ownerEmail;
                        return next;
                      });
                    }}
                  />
                  <span>Select existing user</span>
                </label>
              </div>

              <div className="tenant-create-form-grid">
                {ownerMode === "email" ? (
                  <div className="tenant-create-form-field tenant-create-form-field-full">
                    <Label htmlFor="tenant-owner-email">Owner email</Label>
                    <Input
                      id="tenant-owner-email"
                      type="email"
                      value={ownerEmail}
                      onChange={(event) => setOwnerEmail(event.target.value)}
                      placeholder="owner@clinic.example"
                      aria-invalid={Boolean(fieldErrors.ownerEmail)}
                    />
                    {fieldErrors.ownerEmail ? (
                      <p className="tenant-create-form-field-error">{fieldErrors.ownerEmail}</p>
                    ) : (
                      <p className="tenant-create-form-field-hint">
                        A new owner account will be created and invited during provisioning.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="tenant-create-form-field tenant-create-form-field-full">
                    <Label htmlFor="tenant-owner">Tenant owner</Label>
                    <select
                      id="tenant-owner"
                      className={cn(
                        "tenant-create-form-select",
                        fieldErrors.ownerUserId && "tenant-create-form-select-error",
                      )}
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
                    ) : users.length === 0 ? (
                      <p className="tenant-create-form-field-hint">
                        No users available. Switch to email invite to create a new owner.
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            </fieldset>

            <Button type="submit" className="btn-primary" disabled={createTenant.isPending}>
              {createTenant.isPending ? "Provisioning tenant..." : "Create tenant"}
            </Button>
          </form>
        )}
      </CardBody>
    </Card>
  );
}
