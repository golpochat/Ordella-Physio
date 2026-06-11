"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useClinicLocationsList } from "@/hooks/useClinicPortal";
import { useUpdateClinicTerminal } from "@/hooks/useTerminalPortal";
import { parseTerminalUpdateErrors } from "@/lib/terminal-api-errors";
import type { ClinicTerminal, TerminalStatus, TerminalType } from "@/lib/terminal-portal-types";

const TERMINAL_TYPE_OPTIONS: Array<{ value: TerminalType; label: string }> = [
  { value: "POS", label: "POS" },
  { value: "KIOSK", label: "Kiosk" },
  { value: "PRINTER", label: "Printer" },
  { value: "TABLET", label: "Tablet" },
  { value: "OTHER", label: "Other" },
];

const TERMINAL_STATUS_OPTIONS: TerminalStatus[] = ["ACTIVE", "INACTIVE"];

const CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAC_REGEX = /^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i;

function isValidIpAddress(value: string): boolean {
  const ipv4 =
    /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)$/.test(value);
  if (ipv4) {
    return true;
  }

  const ipv6 = /^([0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}$/i.test(value);
  return ipv6;
}

type TerminalEditFormProps = {
  terminal: ClinicTerminal;
};

export function TerminalEditForm({ terminal }: TerminalEditFormProps) {
  const router = useRouter();
  const updateTerminal = useUpdateClinicTerminal(terminal.id);
  const locationsQuery = useClinicLocationsList({ status: "ACTIVE", limit: 200, page: 1 });

  const [name, setName] = useState(terminal.name);
  const [code, setCode] = useState(terminal.code);
  const [type, setType] = useState<TerminalType>(terminal.type);
  const [locationId, setLocationId] = useState(terminal.locationId);
  const [ipAddress, setIpAddress] = useState(terminal.ipAddress ?? "");
  const [macAddress, setMacAddress] = useState(terminal.macAddress ?? "");
  const [status, setStatus] = useState<TerminalStatus>(terminal.status);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const locations = locationsQuery.data?.data ?? [];

  useEffect(() => {
    setName(terminal.name);
    setCode(terminal.code);
    setType(terminal.type);
    setLocationId(terminal.locationId);
    setIpAddress(terminal.ipAddress ?? "");
    setMacAddress(terminal.macAddress ?? "");
    setStatus(terminal.status);
  }, [terminal]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (name.trim() && name.trim().length < 2) {
      errors.name = "Terminal name must be at least 2 characters";
    }

    if (code.trim() && !CODE_REGEX.test(code.trim())) {
      errors.code = "Code must be lowercase and can contain letters, numbers, and hyphens";
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
        <CardTitle>Edit terminal</CardTitle>
        <CardDescription>Update terminal details, location assignment, and status.</CardDescription>
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

            updateTerminal.mutate(
              {
                name: name.trim(),
                code: code.trim().toLowerCase(),
                type,
                locationId: locationId.trim(),
                ipAddress: ipAddress.trim() || null,
                macAddress: macAddress.trim() || null,
                status,
              },
              {
                onSuccess: () => {
                  toast.success("Terminal updated successfully.");
                  router.push("/clinic/terminals");
                },
                onError: (error) => {
                  const parsed = parseTerminalUpdateErrors(error);

                  if (parsed.forbidden || parsed.tenantMismatch || parsed.locationMismatch) {
                    router.push("/forbidden");
                    return;
                  }

                  if (parsed.notFound) {
                    toast.error(parsed.generalError ?? "Terminal does not exist.");
                    router.push("/clinic/terminals");
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
              <Label htmlFor="terminal-edit-name">Name</Label>
              <Input
                id="terminal-edit-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name ? (
                <p className="tenant-create-form-field-error">{fieldErrors.name}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="terminal-edit-code">Code</Label>
              <Input
                id="terminal-edit-code"
                value={code}
                onChange={(event) => setCode(event.target.value.toLowerCase())}
                aria-invalid={Boolean(fieldErrors.code)}
              />
              {fieldErrors.code ? (
                <p className="tenant-create-form-field-error">{fieldErrors.code}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="terminal-edit-type">Type</Label>
              <select
                id="terminal-edit-type"
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
              <Label htmlFor="terminal-edit-location">Location</Label>
              <select
                id="terminal-edit-location"
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
              <Label htmlFor="terminal-edit-ip-address">IP address</Label>
              <Input
                id="terminal-edit-ip-address"
                value={ipAddress}
                onChange={(event) => setIpAddress(event.target.value)}
                aria-invalid={Boolean(fieldErrors.ipAddress)}
              />
              {fieldErrors.ipAddress ? (
                <p className="tenant-create-form-field-error">{fieldErrors.ipAddress}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="terminal-edit-mac-address">MAC address</Label>
              <Input
                id="terminal-edit-mac-address"
                value={macAddress}
                onChange={(event) => setMacAddress(event.target.value)}
                aria-invalid={Boolean(fieldErrors.macAddress)}
              />
              {fieldErrors.macAddress ? (
                <p className="tenant-create-form-field-error">{fieldErrors.macAddress}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="terminal-edit-status">Status</Label>
              <select
                id="terminal-edit-status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={status}
                onChange={(event) => setStatus(event.target.value as TerminalStatus)}
                aria-invalid={Boolean(fieldErrors.status)}
              >
                {TERMINAL_STATUS_OPTIONS.map((option) => (
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

          <Button type="submit" className="btn-primary" disabled={updateTerminal.isPending}>
            {updateTerminal.isPending ? (
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
