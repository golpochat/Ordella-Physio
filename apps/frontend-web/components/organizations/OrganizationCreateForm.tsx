"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreatePlatformOrganization } from "@/hooks/useSuperAdminPortal";
import { parseOrganizationCreateErrors } from "@/lib/organization-api-errors";
import {
  validateBillingModel,
  validateOrganizationEmail,
  validateOrganizationName,
  validateOrganizationPhone,
} from "@/lib/organization-form-validation";
import { cn } from "@/lib/cn";
import type { PlatformOrganization } from "@/lib/super-admin-portal-types";

type SuccessSummary = {
  organizationName: string;
  organizationCode: string;
  primaryContactEmail: string;
};

export function OrganizationCreateForm() {
  const router = useRouter();
  const createOrganization = useCreatePlatformOrganization();

  const [organizationName, setOrganizationName] = useState("");
  const [description, setDescription] = useState("");
  const [primaryContactName, setPrimaryContactName] = useState("");
  const [primaryContactEmail, setPrimaryContactEmail] = useState("");
  const [primaryContactPhone, setPrimaryContactPhone] = useState("");
  const [billingModel, setBillingModel] = useState<"tenant-level" | "organization-level" | "">("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successSummary, setSuccessSummary] = useState<SuccessSummary | null>(null);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    const nameError = validateOrganizationName(organizationName);
    if (nameError) errors.organizationName = nameError;

    if (!primaryContactName.trim()) {
      errors.primaryContactName = "Primary contact name is required";
    }

    const emailError = validateOrganizationEmail(primaryContactEmail);
    if (emailError) errors.primaryContactEmail = emailError;

    const phoneError = validateOrganizationPhone(primaryContactPhone);
    if (phoneError) errors.primaryContactPhone = phoneError;

    const billingError = validateBillingModel(billingModel);
    if (billingError) errors.billingModel = billingError;

    return errors;
  }

  if (successSummary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Organization created</CardTitle>
          <CardDescription>Provisioning completed successfully.</CardDescription>
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
              <dt>Primary contact email</dt>
              <dd>{successSummary.primaryContactEmail}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <Button type="button" className="btn-primary" onClick={() => router.push("/super-admin/tenants/create")}>
              Create tenant
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
        <CardTitle>Create organization</CardTitle>
        <CardDescription>Register a company-level organization before provisioning clinic tenants.</CardDescription>
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

            createOrganization.mutate(
              {
                organizationName: organizationName.trim(),
                description: description.trim() || undefined,
                primaryContactName: primaryContactName.trim(),
                primaryContactEmail: primaryContactEmail.trim(),
                primaryContactPhone: primaryContactPhone.trim(),
                billingModel: billingModel as "tenant-level" | "organization-level",
              },
              {
                onSuccess: (response) => {
                  const organization = (response as { organization: PlatformOrganization }).organization;
                  setSuccessSummary({
                    organizationName: organization.name,
                    organizationCode: organization.organizationCode ?? organization.code,
                    primaryContactEmail: organization.primaryContactEmail,
                  });
                },
                onError: (error) => {
                  const parsed = parseOrganizationCreateErrors(error);
                  if (parsed.forbidden) {
                    router.push("/forbidden");
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

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Organization details</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field">
                <Label htmlFor="organization-name">Organization name</Label>
                <Input
                  id="organization-name"
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  aria-invalid={Boolean(fieldErrors.organizationName)}
                />
                {fieldErrors.organizationName ? (
                  <p className="form-field-error">{fieldErrors.organizationName}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="organization-billing-model">Billing model</Label>
                <select
                  id="organization-billing-model"
                  className={cn(
                    "tenant-create-form-select",
                    fieldErrors.billingModel && "tenant-create-form-select-error",
                  )}
                  value={billingModel}
                  onChange={(event) =>
                    setBillingModel(event.target.value as "tenant-level" | "organization-level" | "")
                  }
                  aria-invalid={Boolean(fieldErrors.billingModel)}
                >
                  <option value="">Select billing model</option>
                  <option value="tenant-level">Tenant-level billing</option>
                  <option value="organization-level">Organization-level billing</option>
                </select>
                {fieldErrors.billingModel ? (
                  <p className="form-field-error">{fieldErrors.billingModel}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field tenant-create-form-field-full">
                <Label htmlFor="organization-description">Description (optional)</Label>
                <Input
                  id="organization-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="tenant-create-form-section">
            <legend className="tenant-create-form-section-title">Primary contact</legend>
            <div className="tenant-create-form-grid">
              <div className="tenant-create-form-field">
                <Label htmlFor="organization-contact-name">Contact name</Label>
                <Input
                  id="organization-contact-name"
                  value={primaryContactName}
                  onChange={(event) => setPrimaryContactName(event.target.value)}
                  aria-invalid={Boolean(fieldErrors.primaryContactName)}
                />
                {fieldErrors.primaryContactName ? (
                  <p className="form-field-error">{fieldErrors.primaryContactName}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="organization-contact-email">Contact email</Label>
                <Input
                  id="organization-contact-email"
                  type="email"
                  value={primaryContactEmail}
                  onChange={(event) => setPrimaryContactEmail(event.target.value)}
                  aria-invalid={Boolean(fieldErrors.primaryContactEmail)}
                />
                {fieldErrors.primaryContactEmail ? (
                  <p className="form-field-error">{fieldErrors.primaryContactEmail}</p>
                ) : null}
              </div>

              <div className="tenant-create-form-field">
                <Label htmlFor="organization-contact-phone">Contact phone</Label>
                <Input
                  id="organization-contact-phone"
                  type="tel"
                  value={primaryContactPhone}
                  onChange={(event) => setPrimaryContactPhone(event.target.value)}
                  aria-invalid={Boolean(fieldErrors.primaryContactPhone)}
                />
                {fieldErrors.primaryContactPhone ? (
                  <p className="form-field-error">{fieldErrors.primaryContactPhone}</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <Button type="submit" className="btn-primary" disabled={createOrganization.isPending}>
            {createOrganization.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating organization...
              </>
            ) : (
              "Create organization"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
