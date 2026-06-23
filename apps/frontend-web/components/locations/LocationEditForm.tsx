"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressFormFields } from "@/components/address";
import { Input, Label } from "@/components/ui/input";
import { useUpdateClinicLocation } from "@/hooks/useClinicPortal";
import { parseLocationUpdateErrors } from "@/lib/location-api-errors";
import type { ClinicLocation } from "@/lib/clinic-portal-types";
import {
  fromLocationAddress,
  toLocationAddressPayload,
} from "@/lib/postal-address";
import {
  TENANT_TIMEZONE_OPTIONS,
} from "@/lib/tenant-form-options";

const CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOCATION_STATUS_OPTIONS = ["ACTIVE", "INACTIVE"] as const;

type LocationEditFormProps = {
  location: ClinicLocation;
};

export function LocationEditForm({ location }: LocationEditFormProps) {
  const router = useRouter();
  const updateLocation = useUpdateClinicLocation(location.id);

  const [name, setName] = useState(location.name);
  const [code, setCode] = useState(location.code);
  const [address, setAddress] = useState(() => fromLocationAddress(location));
  const [phone, setPhone] = useState(location.phone ?? "");
  const [email, setEmail] = useState(location.email ?? "");
  const [timezone, setTimezone] = useState(location.timezone);
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(location.status);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setName(location.name);
    setCode(location.code);
    setAddress(fromLocationAddress(location));
    setPhone(location.phone ?? "");
    setEmail(location.email ?? "");
    setTimezone(location.timezone);
    setStatus(location.status);
  }, [location]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (name.trim() && name.trim().length < 2) {
      errors.name = "Location name must be at least 2 characters";
    }

    if (code.trim() && !CODE_REGEX.test(code.trim())) {
      errors.code = "Code must be lowercase and can contain letters, numbers, and hyphens";
    }

    if (email.trim() && !EMAIL_REGEX.test(email.trim())) {
      errors.email = "Enter a valid email";
    }

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit location</CardTitle>
        <CardDescription>Update clinic location details and status.</CardDescription>
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

            updateLocation.mutate(
              {
                name: name.trim(),
                code: code.trim().toLowerCase(),
                ...toLocationAddressPayload(address),
                addressLine2: address.line2.trim() || null,
                state: address.region.trim() || null,
                country: address.country.trim().toUpperCase(),
                phone: phone.trim() || null,
                email: email.trim() || null,
                timezone: timezone.trim(),
                status,
              },
              {
                onSuccess: () => {
                  toast.success("Location updated successfully.");
                  router.push("/clinic/locations");
                },
                onError: (error) => {
                  const parsed = parseLocationUpdateErrors(error);

                  if (parsed.forbidden || parsed.tenantMismatch) {
                    router.push("/forbidden");
                    return;
                  }

                  if (parsed.notFound) {
                    toast.error(parsed.generalError ?? "Location does not exist.");
                    router.push("/clinic/locations");
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
              <Label htmlFor="edit-location-name">Name</Label>
              <Input
                id="edit-location-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name ? (
                <p className="form-field-error">{fieldErrors.name}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-location-code">Code</Label>
              <Input
                id="edit-location-code"
                value={code}
                onChange={(event) => setCode(event.target.value.toLowerCase())}
                aria-invalid={Boolean(fieldErrors.code)}
              />
              {fieldErrors.code ? (
                <p className="form-field-error">{fieldErrors.code}</p>
              ) : null}
            </div>

            <AddressFormFields
              idPrefix="edit-location"
              value={address}
              onChange={setAddress}
              disabled={updateLocation.isPending}
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
              <Label htmlFor="edit-location-phone">Phone</Label>
              <Input
                id="edit-location-phone"
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
              <Label htmlFor="edit-location-email">Email</Label>
              <Input
                id="edit-location-email"
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
              <Label htmlFor="edit-location-timezone">Timezone</Label>
              <select
                id="edit-location-timezone"
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

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-location-status">Status</Label>
              <select
                id="edit-location-status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={status}
                onChange={(event) => setStatus(event.target.value as "ACTIVE" | "INACTIVE")}
                aria-invalid={Boolean(fieldErrors.status)}
              >
                {LOCATION_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {fieldErrors.status ? (
                <p className="form-field-error">{fieldErrors.status}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="btn-primary" disabled={updateLocation.isPending}>
            {updateLocation.isPending ? (
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
