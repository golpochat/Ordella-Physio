"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreatePlatformTenantDomain } from "@/hooks/useSuperAdminPortal";
import { parseTenantDomainErrors } from "@/lib/tenant-api-errors";
import {
  normalizeDomainInput,
  validateTenantDomain,
} from "@/lib/tenant-domain-form-validation";

type TenantDomainFormProps = {
  tenantId: string;
  onForbidden?: () => void;
  onCreated?: () => void;
};

export function TenantDomainForm({ tenantId, onForbidden, onCreated }: TenantDomainFormProps) {
  const createDomain = useCreatePlatformTenantDomain(tenantId);
  const [domain, setDomain] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add custom domain</CardTitle>
        <CardDescription>
          Map a custom domain to this tenant. You will verify ownership via a DNS TXT record.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="tenant-create-form"
          onSubmit={(event) => {
            event.preventDefault();
            setGeneralError(null);

            const domainError = validateTenantDomain(domain);
            const clientErrors: Record<string, string> = {};
            if (domainError) {
              clientErrors.domain = domainError;
            }

            setFieldErrors(clientErrors);
            if (Object.keys(clientErrors).length > 0) {
              return;
            }

            createDomain.mutate(
              {
                domain: normalizeDomainInput(domain),
                type: "CUSTOM",
              },
              {
                onSuccess: () => {
                  toast.success("Domain added successfully.");
                  setDomain("");
                  onCreated?.();
                },
                onError: (error) => {
                  const parsed = parseTenantDomainErrors(error);
                  if (parsed.tenantMismatch) {
                    onForbidden?.();
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
              <Label htmlFor="tenant-custom-domain">Domain</Label>
              <Input
                id="tenant-custom-domain"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                placeholder="clinic.example.com"
                aria-invalid={Boolean(fieldErrors.domain)}
              />
              {fieldErrors.domain ? (
                <p className="tenant-create-form-field-error">{fieldErrors.domain}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="tenant-domain-type">Type</Label>
              <select id="tenant-domain-type" className="tenant-create-form-select" disabled>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="btn-primary" disabled={createDomain.isPending}>
            {createDomain.isPending ? "Adding domain..." : "Add domain"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
