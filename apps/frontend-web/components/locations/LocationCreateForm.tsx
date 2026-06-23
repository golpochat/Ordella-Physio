"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressFormFields } from "@/components/address";
import { Input, Label } from "@/components/ui/input";
import { useCreateClinicLocation } from "@/hooks/useClinicPortal";
import { parseLocationCreateErrors } from "@/lib/location-api-errors";
import {
  emptyPostalAddress,
  mapPostalErrorsToLocationKeys,
  toLocationAddressPayload,
  validatePostalAddress,
} from "@/lib/postal-address";
import { PLATFORM_DEFAULT_COUNTRY } from "@/lib/platform-formatting";
import {
  TENANT_TIMEZONE_OPTIONS,
} from "@/lib/tenant-form-options";

function slugifyCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LocationCreateForm() {
  const router = useRouter();
  const createLocation = useCreateClinicLocation();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeTouched, setCodeTouched] = useState(false);
  const [address, setAddress] = useState(() => emptyPostalAddress(PLATFORM_DEFAULT_COUNTRY));
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("Europe/London");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Location name is required";
    }

    if (!code.trim()) {
      errors.code = "Location code is required";
    } else if (!CODE_REGEX.test(code.trim())) {
      errors.code = "Code must be lowercase and can contain letters, numbers, and hyphens";
    }

    Object.assign(errors, mapPostalErrorsToLocationKeys(validatePostalAddress(address)));

    if (!timezone.trim()) {
      errors.timezone = "Timezone is required";
    }

    if (email.trim() && !EMAIL_REGEX.test(email.trim())) {
      errors.email = "Enter a valid email";
    }

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create location</CardTitle>
        <CardDescription>Add a clinic location for appointments and operations.</CardDescription>
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

            createLocation.mutate(
              {
                name: name.trim(),
                code: code.trim().toLowerCase(),
                ...toLocationAddressPayload(address),
                country: address.country.trim().toUpperCase(),
                phone: phone.trim() || undefined,
                email: email.trim() || undefined,
                timezone: timezone.trim(),
              },
              {
                onSuccess: () => {
                  toast.success("Location created successfully.");
                  router.push("/clinic/locations");
                },
                onError: (error) => {
                  const parsed = parseLocationCreateErrors(error);
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

          <div className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="location-name">Name</Label>
              <Input
                id="location-name"
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
                <p className="form-field-error">{fieldErrors.name}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="location-code">Code</Label>
              <Input
                id="location-code"
                value={code}
                onChange={(event) => {
                  setCodeTouched(true);
                  setCode(event.target.value.toLowerCase());
                }}
                aria-invalid={Boolean(fieldErrors.code)}
              />
              {fieldErrors.code ? (
                <p className="form-field-error">{fieldErrors.code}</p>
              ) : null}
            </div>

            <AddressFormFields
              idPrefix="location"
              value={address}
              onChange={setAddress}
              disabled={createLocation.isPending}
              showRegion
              errors={{
                line1: fieldErrors.addressLine1,
                line2: fieldErrors.addressLine2,
                city: fieldErrors.city,
                region: fieldErrors.state,
                postalCode: fieldErrors.postalCode,
                country: fieldErrors.country,
              }}
            />

            <div className="tenant-create-form-field">
              <Label htmlFor="location-phone">Phone</Label>
              <Input
                id="location-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                aria-invalid={Boolean(fieldErrors.phone)}
              />
              {fieldErrors.phone ? (
                <p className="form-field-error">{fieldErrors.phone}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="location-email">Email</Label>
              <Input
                id="location-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email ? (
                <p className="form-field-error">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="location-timezone">Timezone</Label>
              <select
                id="location-timezone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                <p className="form-field-error">{fieldErrors.timezone}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="btn-primary" disabled={createLocation.isPending}>
            {createLocation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating location...
              </>
            ) : (
              "Create location"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
