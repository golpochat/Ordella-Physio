"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useClinicLocationsList } from "@/hooks/useClinicPortal";
import { useCreateClinicTerminal } from "@/hooks/useTerminalPortal";
import { parseTerminalCreateErrors } from "@/lib/terminal-api-errors";
import type { TerminalType } from "@/lib/terminal-portal-types";

const TERMINAL_TYPE_OPTIONS: Array<{ value: TerminalType; label: string }> = [
  { value: "POS", label: "POS" },
  { value: "KIOSK", label: "Kiosk" },
  { value: "PRINTER", label: "Printer" },
  { value: "TABLET", label: "Tablet" },
  { value: "OTHER", label: "Other" },
];

const CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAC_REGEX = /^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i;

function slugifyCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidIpAddress(value: string): boolean {
  const ipv4 =
    /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)$/.test(value);
  if (ipv4) {
    return true;
  }

  const ipv6 = /^([0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}$/i.test(value);
  return ipv6;
}

export function TerminalCreateForm() {
  const router = useRouter();
  const createTerminal = useCreateClinicTerminal();
  const locationsQuery = useClinicLocationsList({ status: "ACTIVE", limit: 200, page: 1 });

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeTouched, setCodeTouched] = useState(false);
  const [type, setType] = useState<TerminalType>("POS");
  const [locationId, setLocationId] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const locations = locationsQuery.data?.data ?? [];

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Terminal name is required";
    }

    if (!code.trim()) {
      errors.code = "Terminal code is required";
    } else if (!CODE_REGEX.test(code.trim())) {
      errors.code = "Code must be lowercase and can contain letters, numbers, and hyphens";
    }

    if (!locationId.trim()) {
      errors.locationId = "Location is required";
    }

    if (ipAddress.trim() && !isValidIpAddress(ipAddress.trim())) {
      errors.ipAddress = "Enter a valid IP address";
    }

    if (macAddress.trim() && !MAC_REGEX.test(macAddress.trim())) {
      errors.macAddress = "Enter a valid MAC address";
    }

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create terminal</CardTitle>
        <CardDescription>Register a POS, kiosk, printer, or tablet for a clinic location.</CardDescription>
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

            createTerminal.mutate(
              {
                name: name.trim(),
                code: code.trim().toLowerCase(),
                type,
                locationId: locationId.trim(),
                ipAddress: ipAddress.trim() || undefined,
                macAddress: macAddress.trim() || undefined,
              },
              {
                onSuccess: () => {
                  toast.success("Terminal created successfully.");
                  router.push("/clinic/terminals");
                },
                onError: (error) => {
                  const parsed = parseTerminalCreateErrors(error);
                  if (parsed.forbidden || parsed.locationMismatch) {
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
              <Label htmlFor="terminal-name">Name</Label>
              <Input
                id="terminal-name"
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
              <Label htmlFor="terminal-code">Code</Label>
              <Input
                id="terminal-code"
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
              <Label htmlFor="terminal-type">Type</Label>
              <select
                id="terminal-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={type}
                onChange={(event) => setType(event.target.value as TerminalType)}
                aria-invalid={Boolean(fieldErrors.type)}
              >
                {TERMINAL_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {fieldErrors.type ? (
                <p className="tenant-create-form-field-error">{fieldErrors.type}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="terminal-location">Location</Label>
              <select
                id="terminal-location"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={locationId}
                onChange={(event) => setLocationId(event.target.value)}
                aria-invalid={Boolean(fieldErrors.locationId)}
                disabled={locationsQuery.isLoading}
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {fieldErrors.locationId ? (
                <p className="tenant-create-form-field-error">{fieldErrors.locationId}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="terminal-ip-address">IP address</Label>
              <Input
                id="terminal-ip-address"
                value={ipAddress}
                onChange={(event) => setIpAddress(event.target.value)}
                aria-invalid={Boolean(fieldErrors.ipAddress)}
              />
              {fieldErrors.ipAddress ? (
                <p className="tenant-create-form-field-error">{fieldErrors.ipAddress}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="terminal-mac-address">MAC address</Label>
              <Input
                id="terminal-mac-address"
                value={macAddress}
                onChange={(event) => setMacAddress(event.target.value)}
                aria-invalid={Boolean(fieldErrors.macAddress)}
              />
              {fieldErrors.macAddress ? (
                <p className="tenant-create-form-field-error">{fieldErrors.macAddress}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="btn-primary" disabled={createTerminal.isPending}>
            {createTerminal.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating terminal...
              </>
            ) : (
              "Create terminal"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
