"use client";

import { toast } from "sonner";
import { Badge } from "@/components/dashboard/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useDeletePlatformTenantDomain,
  useVerifyPlatformTenantDomain,
} from "@/hooks/useSuperAdminPortal";
import type { PlatformTenantDomain } from "@/lib/super-admin-portal-types";
import { parseTenantDomainErrors } from "@/lib/tenant-api-errors";

type TenantDomainListProps = {
  tenantId: string;
  domains: PlatformTenantDomain[];
  onForbidden?: () => void;
};

function VerificationInstructions({ domain }: { domain: PlatformTenantDomain }) {
  if (domain.type !== "CUSTOM" || domain.verified) {
    return null;
  }

  return (
    <div className="tenant-domain-verification">
      <p className="tenant-domain-verification-title">
        Add this TXT record to verify your domain:
      </p>
      <p>
        <span className="text-muted-foreground">TXT name:</span>{" "}
        <code className="tenant-domain-code">_verify.{domain.domain}</code>
      </p>
      <p>
        <span className="text-muted-foreground">TXT value:</span>{" "}
        <code className="tenant-domain-code">{domain.verificationToken}</code>
      </p>
    </div>
  );
}

export function TenantDomainList({ tenantId, domains, onForbidden }: TenantDomainListProps) {
  const verifyDomain = useVerifyPlatformTenantDomain(tenantId);
  const deleteDomain = useDeletePlatformTenantDomain(tenantId);

  const busyId =
    verifyDomain.isPending || deleteDomain.isPending
      ? (verifyDomain.variables ?? deleteDomain.variables ?? null)
      : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapped domains</CardTitle>
      </CardHeader>
      <CardBody className="tenant-domain-list">
        {domains.length === 0 ? (
          <p className="text-muted-foreground">No domains mapped yet.</p>
        ) : (
          domains.map((domain) => (
            <div key={domain.id} className="tenant-domain-item">
              <div className="tenant-domain-item-header">
                <div className="tenant-domain-item-meta">
                  <p className="tenant-domain-name">{domain.domain}</p>
                  <div className="tenant-domain-badges">
                    <Badge variant={domain.type === "PRIMARY" ? "success" : "info"}>
                      {domain.type === "PRIMARY" ? "Primary" : "Custom"}
                    </Badge>
                    <Badge variant={domain.verified ? "success" : "danger"}>
                      {domain.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </div>

                <div className="tenant-domain-actions">
                  {domain.type === "CUSTOM" && !domain.verified ? (
                    <Button
                      variant="outline"
                      disabled={busyId === domain.id}
                      onClick={() => {
                        verifyDomain.mutate(domain.id, {
                          onSuccess: () => toast.success("Domain verified successfully."),
                          onError: (error) => {
                            const parsed = parseTenantDomainErrors(error);
                            if (parsed.tenantMismatch) {
                              onForbidden?.();
                              return;
                            }
                            if (parsed.invalidVerification) {
                              toast.error("Verification failed.");
                              return;
                            }
                            toast.error(parsed.generalError ?? "Verification failed.");
                          },
                        });
                      }}
                    >
                      {busyId === domain.id && verifyDomain.isPending ? "Verifying..." : "Verify"}
                    </Button>
                  ) : null}

                  {domain.type === "CUSTOM" ? (
                    <Button
                      variant="destructive"
                      disabled={busyId === domain.id}
                      onClick={() => {
                        deleteDomain.mutate(domain.id, {
                          onSuccess: () => toast.success("Domain removed."),
                          onError: (error) => {
                            const parsed = parseTenantDomainErrors(error);
                            if (parsed.tenantMismatch) {
                              onForbidden?.();
                              return;
                            }
                            if (parsed.cannotDeletePrimary) {
                              toast.error("Primary domain cannot be removed.");
                              return;
                            }
                            toast.error(parsed.generalError ?? "Failed to remove domain.");
                          },
                        });
                      }}
                    >
                      {busyId === domain.id && deleteDomain.isPending ? "Removing..." : "Delete"}
                    </Button>
                  ) : null}
                </div>
              </div>

              <VerificationInstructions domain={domain} />
            </div>
          ))
        )}
      </CardBody>
    </Card>
  );
}
