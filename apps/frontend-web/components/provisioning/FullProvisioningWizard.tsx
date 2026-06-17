"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  useFullPlatformProvisioning,
  usePlatformUsers,
} from "@/hooks/useSuperAdminPortal";
import { parseFullProvisioningErrors } from "@/lib/provisioning-api-errors";
import {
  validateBillingModel,
  validateOrganizationEmail,
  validateOrganizationName,
  validateOrganizationPhone,
} from "@/lib/organization-form-validation";
import { TENANT_CURRENCY_OPTIONS, TENANT_TIMEZONE_OPTIONS } from "@/lib/tenant-form-options";
import {
  validateTenantCurrency,
  validateTenantName,
  validateTenantOwnerSelection,
  validateTenantTimezone,
} from "@/lib/tenant-form-validation";
import { cn } from "@/lib/cn";
import type { FullProvisioningResponse } from "@/lib/super-admin-portal-types";

type WizardStep = 1 | 2 | 3;
type OwnerMode = "existing" | "email";

type OrganizationFormState = {
  organizationName: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  billingModel: "tenant-level" | "organization-level" | "";
  description: string;
};

type TenantFormState = {
  tenantName: string;
  timezone: string;
  currency: string;
};

type OwnerFormState = {
  mode: OwnerMode;
  ownerUserId: string;
  ownerEmail: string;
};

const STEP_LABELS = ["Organization", "Tenant", "Owner"] as const;

function validateOrganizationStep(state: OrganizationFormState): Record<string, string> {
  const errors: Record<string, string> = {};

  const nameError = validateOrganizationName(state.organizationName);
  if (nameError) errors.organizationName = nameError;

  if (!state.primaryContactName.trim()) {
    errors.primaryContactName = "Primary contact name is required";
  }

  const emailError = validateOrganizationEmail(state.primaryContactEmail);
  if (emailError) errors.primaryContactEmail = emailError;

  const phoneError = validateOrganizationPhone(state.primaryContactPhone);
  if (phoneError) errors.primaryContactPhone = phoneError;

  const billingError = validateBillingModel(state.billingModel);
  if (billingError) errors.billingModel = billingError;

  return errors;
}

function validateTenantStep(state: TenantFormState): Record<string, string> {
  const errors: Record<string, string> = {};

  const nameError = validateTenantName(state.tenantName);
  if (nameError) errors.tenantName = nameError;

  const timezoneError = validateTenantTimezone(state.timezone);
  if (timezoneError) errors.timezone = timezoneError;

  const currencyError = validateTenantCurrency(state.currency);
  if (currencyError) errors.currency = currencyError;

  return errors;
}

function validateOwnerStep(state: OwnerFormState): Record<string, string> {
  return validateTenantOwnerSelection({
    mode: state.mode,
    ownerUserId: state.ownerUserId,
    ownerEmail: state.ownerEmail,
  });
}

export function FullProvisioningWizard() {
  const router = useRouter();
  const provisionFull = useFullPlatformProvisioning();
  const { data: usersResponse } = usePlatformUsers({ limit: 100, page: 1 });
  const users = usersResponse?.data ?? [];

  const [step, setStep] = useState<WizardStep>(1);
  const [organization, setOrganization] = useState<OrganizationFormState>({
    organizationName: "",
    primaryContactName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    billingModel: "",
    description: "",
  });
  const [tenant, setTenant] = useState<TenantFormState>({
    tenantName: "",
    timezone: "UTC",
    currency: "USD",
  });
  const [owner, setOwner] = useState<OwnerFormState>({
    mode: "email",
    ownerUserId: "",
    ownerEmail: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successSummary, setSuccessSummary] = useState<FullProvisioningResponse | null>(null);

  const stepErrors = useMemo(() => {
    if (step === 1) return validateOrganizationStep(organization);
    if (step === 2) return validateTenantStep(tenant);
    return validateOwnerStep(owner);
  }, [step, organization, tenant, owner]);

  const canProceed = Object.keys(stepErrors).length === 0;

  function fieldError(key: string): string | undefined {
    return fieldErrors[key] ?? fieldErrors[`organization.${key}`] ?? fieldErrors[`tenant.${key}`] ?? fieldErrors[`owner.${key}`];
  }

  if (successSummary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Platform provisioned</CardTitle>
          <CardDescription>Organization, tenant, and owner were created in one atomic operation.</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          <dl className="tenant-create-form-success-summary">
            <div>
              <dt>Organization</dt>
              <dd>{successSummary.organizationName}</dd>
            </div>
            <div>
              <dt>Organization code</dt>
              <dd>
                <code>{successSummary.organizationCode}</code>
              </dd>
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
        <CardTitle>Provision platform workspace</CardTitle>
        <CardDescription>
          Create an organization, tenant, and owner in a single atomic provisioning flow.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <ol className="provisioning-wizard-steps" aria-label="Provisioning steps">
          {STEP_LABELS.map((label, index) => {
            const stepNumber = (index + 1) as WizardStep;
            const isActive = step === stepNumber;
            const isComplete = step > stepNumber;

            return (
              <li
                key={label}
                className={cn(
                  "provisioning-wizard-step",
                  isActive && "provisioning-wizard-step-active",
                  isComplete && "provisioning-wizard-step-complete",
                )}
              >
                <span className="provisioning-wizard-step-index">{stepNumber}</span>
                <span>{label}</span>
              </li>
            );
          })}
        </ol>

        {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

        {step === 1 ? (
          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Organization</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field tenant-create-form-field-full">
                <Label htmlFor="provision-org-name">Organization name</Label>
                <Input
                  id="provision-org-name"
                  value={organization.organizationName}
                  onChange={(event) =>
                    setOrganization((current) => ({ ...current, organizationName: event.target.value }))
                  }
                  aria-invalid={Boolean(fieldError("organizationName"))}
                />
                {fieldError("organizationName") ? (
                  <p className="tenant-create-form-field-error">{fieldError("organizationName")}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="provision-contact-name">Primary contact name</Label>
                <Input
                  id="provision-contact-name"
                  value={organization.primaryContactName}
                  onChange={(event) =>
                    setOrganization((current) => ({ ...current, primaryContactName: event.target.value }))
                  }
                  aria-invalid={Boolean(fieldError("primaryContactName"))}
                />
                {fieldError("primaryContactName") ? (
                  <p className="tenant-create-form-field-error">{fieldError("primaryContactName")}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="provision-contact-email">Primary contact email</Label>
                <Input
                  id="provision-contact-email"
                  type="email"
                  value={organization.primaryContactEmail}
                  onChange={(event) =>
                    setOrganization((current) => ({ ...current, primaryContactEmail: event.target.value }))
                  }
                  aria-invalid={Boolean(fieldError("primaryContactEmail"))}
                />
                {fieldError("primaryContactEmail") ? (
                  <p className="tenant-create-form-field-error">{fieldError("primaryContactEmail")}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="provision-contact-phone">Primary contact phone</Label>
                <Input
                  id="provision-contact-phone"
                  value={organization.primaryContactPhone}
                  onChange={(event) =>
                    setOrganization((current) => ({ ...current, primaryContactPhone: event.target.value }))
                  }
                  aria-invalid={Boolean(fieldError("primaryContactPhone"))}
                />
                {fieldError("primaryContactPhone") ? (
                  <p className="tenant-create-form-field-error">{fieldError("primaryContactPhone")}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="provision-billing-model">Billing model</Label>
                <select
                  id="provision-billing-model"
                  className={cn(
                    "tenant-create-form-select",
                    fieldError("billingModel") && "tenant-create-form-select-error",
                  )}
                  value={organization.billingModel}
                  onChange={(event) =>
                    setOrganization((current) => ({
                      ...current,
                      billingModel: event.target.value as OrganizationFormState["billingModel"],
                    }))
                  }
                  aria-invalid={Boolean(fieldError("billingModel"))}
                >
                  <option value="">Select billing model</option>
                  <option value="tenant-level">Tenant-level billing</option>
                  <option value="organization-level">Organization-level billing</option>
                </select>
                {fieldError("billingModel") ? (
                  <p className="tenant-create-form-field-error">{fieldError("billingModel")}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field tenant-create-form-field-full">
                <Label htmlFor="provision-description">Description (optional)</Label>
                <Input
                  id="provision-description"
                  value={organization.description}
                  onChange={(event) =>
                    setOrganization((current) => ({ ...current, description: event.target.value }))
                  }
                />
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Tenant</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field tenant-create-form-field-full">
                <Label htmlFor="provision-tenant-name">Tenant name</Label>
                <Input
                  id="provision-tenant-name"
                  value={tenant.tenantName}
                  onChange={(event) => setTenant((current) => ({ ...current, tenantName: event.target.value }))}
                  aria-invalid={Boolean(fieldError("tenantName"))}
                />
                {fieldError("tenantName") ? (
                  <p className="tenant-create-form-field-error">{fieldError("tenantName")}</p>
                ) : (
                  <p className="tenant-create-form-field-hint">Tenant code will be generated automatically.</p>
                )}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="provision-timezone">Timezone</Label>
                <select
                  id="provision-timezone"
                  className={cn(
                    "tenant-create-form-select",
                    fieldError("timezone") && "tenant-create-form-select-error",
                  )}
                  value={tenant.timezone}
                  onChange={(event) => setTenant((current) => ({ ...current, timezone: event.target.value }))}
                  aria-invalid={Boolean(fieldError("timezone"))}
                >
                  {TENANT_TIMEZONE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {fieldError("timezone") ? (
                  <p className="tenant-create-form-field-error">{fieldError("timezone")}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="provision-currency">Currency</Label>
                <select
                  id="provision-currency"
                  className={cn(
                    "tenant-create-form-select",
                    fieldError("currency") && "tenant-create-form-select-error",
                  )}
                  value={tenant.currency}
                  onChange={(event) => setTenant((current) => ({ ...current, currency: event.target.value }))}
                  aria-invalid={Boolean(fieldError("currency"))}
                >
                  {TENANT_CURRENCY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {fieldError("currency") ? (
                  <p className="tenant-create-form-field-error">{fieldError("currency")}</p>
                ) : null}
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Tenant owner</legend>
            <div className="tenant-create-form-owner-mode">
              <label className="tenant-create-form-owner-mode-option">
                <input
                  type="radio"
                  name="provision-owner-mode"
                  value="email"
                  checked={owner.mode === "email"}
                  onChange={() => {
                    setOwner({ mode: "email", ownerUserId: "", ownerEmail: "" });
                  }}
                />
                <span>Invite new owner by email</span>
              </label>
              <label className="tenant-create-form-owner-mode-option">
                <input
                  type="radio"
                  name="provision-owner-mode"
                  value="existing"
                  checked={owner.mode === "existing"}
                  onChange={() => {
                    setOwner({ mode: "existing", ownerUserId: "", ownerEmail: "" });
                  }}
                />
                <span>Select existing user</span>
              </label>
            </div>

            {owner.mode === "email" ? (
              <div className="tenant-create-form-field tenant-create-form-field-full">
                <Label htmlFor="provision-owner-email">Owner email</Label>
                <Input
                  id="provision-owner-email"
                  type="email"
                  value={owner.ownerEmail}
                  onChange={(event) => setOwner((current) => ({ ...current, ownerEmail: event.target.value }))}
                  placeholder="owner@clinic.example"
                  aria-invalid={Boolean(fieldError("ownerEmail"))}
                />
                {fieldError("ownerEmail") ? (
                  <p className="tenant-create-form-field-error">{fieldError("ownerEmail")}</p>
                ) : (
                  <p className="tenant-create-form-field-hint">
                    A new owner account will be created and invited during provisioning.
                  </p>
                )}
              </div>
            ) : (
              <div className="tenant-create-form-field tenant-create-form-field-full">
                <Label htmlFor="provision-owner">Tenant owner</Label>
                <select
                  id="provision-owner"
                  className={cn(
                    "tenant-create-form-select",
                    fieldError("ownerUserId") && "tenant-create-form-select-error",
                  )}
                  value={owner.ownerUserId}
                  onChange={(event) => setOwner((current) => ({ ...current, ownerUserId: event.target.value }))}
                  aria-invalid={Boolean(fieldError("ownerUserId"))}
                >
                  <option value="">Select owner</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {[user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || user.id}
                      {user.email ? ` (${user.email})` : ""}
                    </option>
                  ))}
                </select>
                {fieldError("ownerUserId") ? (
                  <p className="tenant-create-form-field-error">{fieldError("ownerUserId")}</p>
                ) : null}
              </div>
            )}

            <div className="provisioning-wizard-review">
              <h3 className="provisioning-wizard-review-title">Review</h3>
              <dl className="tenant-create-form-success-summary">
                <div>
                  <dt>Organization</dt>
                  <dd>{organization.organizationName.trim()}</dd>
                </div>
                <div>
                  <dt>Tenant</dt>
                  <dd>{tenant.tenantName.trim()}</dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>
                    {owner.mode === "email"
                      ? owner.ownerEmail.trim()
                      : users.find((user) => user.id === owner.ownerUserId)?.email ?? "Selected user"}
                  </dd>
                </div>
              </dl>
            </div>
          </fieldset>
        ) : null}

        <div className="provisioning-wizard-actions">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setGeneralError(null);
                setFieldErrors({});
                setStep((current) => (current - 1) as WizardStep);
              }}
            >
              Back
            </Button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <Button
              type="button"
              className="btn-primary"
              disabled={!canProceed}
              onClick={() => {
                const errors = step === 1 ? validateOrganizationStep(organization) : validateTenantStep(tenant);
                setFieldErrors(errors);
                if (Object.keys(errors).length > 0) {
                  return;
                }
                setGeneralError(null);
                setStep((current) => (current + 1) as WizardStep);
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              className="btn-primary"
              disabled={!canProceed || provisionFull.isPending}
              onClick={() => {
                const errors = validateOwnerStep(owner);
                setFieldErrors(errors);
                if (Object.keys(errors).length > 0) {
                  return;
                }

                setGeneralError(null);

                const ownerPayload =
                  owner.mode === "existing"
                    ? { ownerUserId: owner.ownerUserId }
                    : { ownerEmail: owner.ownerEmail.trim().toLowerCase() };

                provisionFull.mutate(
                  {
                    organization: {
                      organizationName: organization.organizationName.trim(),
                      primaryContactName: organization.primaryContactName.trim(),
                      primaryContactEmail: organization.primaryContactEmail.trim(),
                      primaryContactPhone: organization.primaryContactPhone.trim(),
                      billingModel: organization.billingModel as "tenant-level" | "organization-level",
                      description: organization.description.trim() || undefined,
                    },
                    tenant: {
                      tenantName: tenant.tenantName.trim(),
                      timezone: tenant.timezone,
                      currency: tenant.currency,
                    },
                    owner: ownerPayload,
                  },
                  {
                    onSuccess: (response) => setSuccessSummary(response),
                    onError: (error) => {
                      const parsed = parseFullProvisioningErrors(error);
                      setFieldErrors(parsed.fieldErrors);
                      setGeneralError(parsed.generalError);
                    },
                  },
                );
              }}
            >
              {provisionFull.isPending ? "Provisioning..." : "Provision"}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
