"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreatePlatformOrganization } from "@/hooks/useSuperAdminPortal";
import { parseOrganizationCreateErrors } from "@/lib/organization-api-errors";

function slugifyCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OrganizationCreateForm() {
  const router = useRouter();
  const createOrganization = useCreatePlatformOrganization();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeTouched, setCodeTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [primaryContactName, setPrimaryContactName] = useState("");
  const [primaryContactEmail, setPrimaryContactEmail] = useState("");
  const [primaryContactPhone, setPrimaryContactPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Organization name is required";
    }

    if (!code.trim()) {
      errors.code = "Organization code is required";
    } else if (!CODE_REGEX.test(code.trim())) {
      errors.code = "Code must be lowercase and can contain letters, numbers, and hyphens";
    }

    if (!primaryContactName.trim()) {
      errors.primaryContactName = "Primary contact name is required";
    }

    if (!primaryContactEmail.trim()) {
      errors.primaryContactEmail = "Primary contact email is required";
    } else if (!EMAIL_REGEX.test(primaryContactEmail.trim())) {
      errors.primaryContactEmail = "Enter a valid email";
    }

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create organization</CardTitle>
        <CardDescription>Provision a new multi-tenant organization on the platform.</CardDescription>
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
                name: name.trim(),
                code: code.trim().toLowerCase(),
                description: description.trim() || undefined,
                primaryContactName: primaryContactName.trim(),
                primaryContactEmail: primaryContactEmail.trim(),
                primaryContactPhone: primaryContactPhone.trim() || undefined,
              },
              {
                onSuccess: () => {
                  toast.success("Organization created successfully.");
                  router.push("/super-admin/organizations");
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
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <div className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="organization-name">Organization name</Label>
              <Input
                id="organization-name"
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
              {fieldErrors.name ? (
                <p className="tenant-create-form-field-error">{fieldErrors.name}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="organization-code">Organization code</Label>
              <Input
                id="organization-code"
                value={code}
                onChange={(event) => {
                  setCodeTouched(true);
                  setCode(event.target.value.toLowerCase());
                }}
                aria-invalid={Boolean(fieldErrors.code)}
              />
              {fieldErrors.code ? (
                <p className="tenant-create-form-field-error">{fieldErrors.code}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="organization-description">Description</Label>
              <Input
                id="organization-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                aria-invalid={Boolean(fieldErrors.description)}
              />
              {fieldErrors.description ? (
                <p className="tenant-create-form-field-error">{fieldErrors.description}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="organization-contact-name">Primary contact name</Label>
              <Input
                id="organization-contact-name"
                value={primaryContactName}
                onChange={(event) => setPrimaryContactName(event.target.value)}
                aria-invalid={Boolean(fieldErrors.primaryContactName)}
              />
              {fieldErrors.primaryContactName ? (
                <p className="tenant-create-form-field-error">{fieldErrors.primaryContactName}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="organization-contact-email">Primary contact email</Label>
              <Input
                id="organization-contact-email"
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
              <Label htmlFor="organization-contact-phone">Primary contact phone</Label>
              <Input
                id="organization-contact-phone"
                type="tel"
                value={primaryContactPhone}
                onChange={(event) => setPrimaryContactPhone(event.target.value)}
                aria-invalid={Boolean(fieldErrors.primaryContactPhone)}
              />
              {fieldErrors.primaryContactPhone ? (
                <p className="tenant-create-form-field-error">{fieldErrors.primaryContactPhone}</p>
              ) : null}
            </div>
          </div>

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
