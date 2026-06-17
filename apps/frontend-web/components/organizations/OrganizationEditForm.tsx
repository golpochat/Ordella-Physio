"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useUpdatePlatformOrganization } from "@/hooks/useSuperAdminPortal";
import { parseOrganizationUpdateErrors } from "@/lib/organization-api-errors";
import type { PlatformOrganization } from "@/lib/super-admin-portal-types";
import { cn } from "@/lib/cn";
import {
  validateBillingModel,
  validateOrganizationEmail,
  validateOrganizationPhone,
} from "@/lib/organization-form-validation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ORGANIZATION_STATUS_OPTIONS = ["ACTIVE", "INACTIVE"] as const;

type OrganizationEditFormProps = {
  organization: PlatformOrganization;
};

export function OrganizationEditForm({ organization }: OrganizationEditFormProps) {
  const router = useRouter();
  const updateOrganization = useUpdatePlatformOrganization(organization.id);

  const [name, setName] = useState(organization.name);
  const [description, setDescription] = useState(organization.description ?? "");
  const [primaryContactName, setPrimaryContactName] = useState(organization.primaryContactName);
  const [primaryContactEmail, setPrimaryContactEmail] = useState(organization.primaryContactEmail);
  const [primaryContactPhone, setPrimaryContactPhone] = useState(organization.primaryContactPhone ?? "");
  const [billingModel, setBillingModel] = useState<"tenant-level" | "organization-level">(
    organization.billingModel ?? "tenant-level",
  );
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(organization.status);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setName(organization.name);
    setDescription(organization.description ?? "");
    setPrimaryContactName(organization.primaryContactName);
    setPrimaryContactEmail(organization.primaryContactEmail);
    setPrimaryContactPhone(organization.primaryContactPhone ?? "");
    setBillingModel(organization.billingModel ?? "tenant-level");
    setStatus(organization.status);
  }, [organization]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (name.trim() && name.trim().length < 3) {
      errors.name = "Organization name must be at least 3 characters";
    }

    if (primaryContactEmail.trim() && !EMAIL_REGEX.test(primaryContactEmail.trim())) {
      errors.primaryContactEmail = "Enter a valid email";
    }

    const phoneError = validateOrganizationPhone(primaryContactPhone);
    if (primaryContactPhone.trim() && phoneError) {
      errors.primaryContactPhone = phoneError;
    }

    const billingError = validateBillingModel(billingModel);
    if (billingError) errors.billingModel = billingError;

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit organization</CardTitle>
        <CardDescription>Update organization details and status.</CardDescription>
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

            updateOrganization.mutate(
              {
                name: name.trim(),
                description: description.trim() || null,
                primaryContactName: primaryContactName.trim(),
                primaryContactEmail: primaryContactEmail.trim(),
                primaryContactPhone: primaryContactPhone.trim() || null,
                billingModel,
                status,
              },
              {
                onSuccess: () => {
                  toast.success("Organization updated successfully.");
                  router.push("/super-admin/organizations");
                },
                onError: (error) => {
                  const parsed = parseOrganizationUpdateErrors(error);

                  if (parsed.forbidden) {
                    router.push("/forbidden");
                    return;
                  }

                  if (parsed.notFound) {
                    toast.error(parsed.generalError ?? "Organization does not exist.");
                    router.push("/super-admin/organizations");
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
              <Label htmlFor="edit-organization-name">Organization name</Label>
              <Input
                id="edit-organization-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name ? (
                <p className="tenant-create-form-field-error">{fieldErrors.name}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-organization-code">Organization code</Label>
              <Input
                id="edit-organization-code"
                value={organization.organizationCode ?? organization.code}
                readOnly
                disabled
              />
              <p className="tenant-create-form-field-hint">Auto-generated and immutable.</p>
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-organization-billing-model">Billing model</Label>
              <select
                id="edit-organization-billing-model"
                className={cn(
                  "tenant-create-form-select",
                  fieldErrors.billingModel && "tenant-create-form-select-error",
                )}
                value={billingModel}
                onChange={(event) =>
                  setBillingModel(event.target.value as "tenant-level" | "organization-level")
                }
              >
                <option value="tenant-level">Tenant-level billing</option>
                <option value="organization-level">Organization-level billing</option>
              </select>
              {fieldErrors.billingModel ? (
                <p className="tenant-create-form-field-error">{fieldErrors.billingModel}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-organization-description">Description</Label>
              <Input
                id="edit-organization-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                aria-invalid={Boolean(fieldErrors.description)}
              />
              {fieldErrors.description ? (
                <p className="tenant-create-form-field-error">{fieldErrors.description}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-organization-contact-name">Primary contact name</Label>
              <Input
                id="edit-organization-contact-name"
                value={primaryContactName}
                onChange={(event) => setPrimaryContactName(event.target.value)}
                aria-invalid={Boolean(fieldErrors.primaryContactName)}
              />
              {fieldErrors.primaryContactName ? (
                <p className="tenant-create-form-field-error">{fieldErrors.primaryContactName}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-organization-contact-email">Primary contact email</Label>
              <Input
                id="edit-organization-contact-email"
                type="email"
                value={primaryContactEmail}
                onChange={(event) => setPrimaryContactEmail(event.target.value)}
                aria-invalid={Boolean(fieldErrors.primaryContactEmail)}
              />
              {fieldErrors.primaryContactEmail ? (
                <p className="tenant-create-form-field-error">{fieldErrors.primaryContactEmail}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-organization-contact-phone">Primary contact phone</Label>
              <Input
                id="edit-organization-contact-phone"
                type="tel"
                value={primaryContactPhone}
                onChange={(event) => setPrimaryContactPhone(event.target.value)}
                aria-invalid={Boolean(fieldErrors.primaryContactPhone)}
              />
              {fieldErrors.primaryContactPhone ? (
                <p className="tenant-create-form-field-error">{fieldErrors.primaryContactPhone}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-organization-status">Status</Label>
              <select
                id="edit-organization-status"
                className={cn("tenant-create-form-select", fieldErrors.status && "tenant-create-form-select-error")}
                value={status}
                onChange={(event) => setStatus(event.target.value as "ACTIVE" | "INACTIVE")}
                aria-invalid={Boolean(fieldErrors.status)}
              >
                {ORGANIZATION_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {fieldErrors.status ? (
                <p className="tenant-create-form-field-error">{fieldErrors.status}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="btn-primary" disabled={updateOrganization.isPending}>
            {updateOrganization.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving changes...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
