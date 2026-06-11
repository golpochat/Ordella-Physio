"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useUpdateClinicLocation } from "@/hooks/useClinicPortal";
import { parseLocationUpdateErrors } from "@/lib/location-api-errors";
import type { ClinicLocation } from "@/lib/clinic-portal-types";
import {
  LOCATION_COUNTRY_OPTIONS,
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
  const [addressLine1, setAddressLine1] = useState(location.addressLine1);
  const [addressLine2, setAddressLine2] = useState(location.addressLine2 ?? "");
  const [city, setCity] = useState(location.city);
  const [state, setState] = useState(location.state ?? "");
  const [postalCode, setPostalCode] = useState(location.postalCode);
  const [country, setCountry] = useState(location.country);
  const [phone, setPhone] = useState(location.phone ?? "");
  const [email, setEmail] = useState(location.email ?? "");
  const [timezone, setTimezone] = useState(location.timezone);
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(location.status);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setName(location.name);
    setCode(location.code);
    setAddressLine1(location.addressLine1);
    setAddressLine2(location.addressLine2 ?? "");
    setCity(location.city);
    setState(location.state ?? "");
    setPostalCode(location.postalCode);
    setCountry(location.country);
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
                addressLine1: addressLine1.trim(),
                addressLine2: addressLine2.trim() || null,
                city: city.trim(),
                state: state.trim() || null,
                postalCode: postalCode.trim(),
                country: country.trim().toUpperCase(),
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
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

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
                <p className="tenant-create-form-field-error">{fieldErrors.name}</p>
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
                <p className="tenant-create-form-field-error">{fieldErrors.code}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-location-address-line-1">Address line 1</Label>
              <Input
                id="edit-location-address-line-1"
                value={addressLine1}
                onChange={(event) => setAddressLine1(event.target.value)}
                aria-invalid={Boolean(fieldErrors.addressLine1)}
              />
              {fieldErrors.addressLine1 ? (
                <p className="tenant-create-form-field-error">{fieldErrors.addressLine1}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-location-address-line-2">Address line 2</Label>
              <Input
                id="edit-location-address-line-2"
                value={addressLine2}
                onChange={(event) => setAddressLine2(event.target.value)}
              />
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-location-city">City</Label>
              <Input
                id="edit-location-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                aria-invalid={Boolean(fieldErrors.city)}
              />
              {fieldErrors.city ? (
                <p className="tenant-create-form-field-error">{fieldErrors.city}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-location-state">State</Label>
              <Input
                id="edit-location-state"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-location-postal-code">Postal code</Label>
              <Input
                id="edit-location-postal-code"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                aria-invalid={Boolean(fieldErrors.postalCode)}
              />
              {fieldErrors.postalCode ? (
                <p className="tenant-create-form-field-error">{fieldErrors.postalCode}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="edit-location-country">Country</Label>
              <select
                id="edit-location-country"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                aria-invalid={Boolean(fieldErrors.country)}
              >
                {LOCATION_COUNTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {fieldErrors.country ? (
                <p className="tenant-create-form-field-error">{fieldErrors.country}</p>
              ) : null}
            </div>

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
                <p className="tenant-create-form-field-error">{fieldErrors.phone}</p>
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
                <p className="tenant-create-form-field-error">{fieldErrors.email}</p>
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
                <p className="tenant-create-form-field-error">{fieldErrors.timezone}</p>
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
                <p className="tenant-create-form-field-error">{fieldErrors.status}</p>
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
