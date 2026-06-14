"use client";

import { useClinicScope } from "./use-clinic-scope";

export function TenantScopeBanner() {
  const { tenant, tenantId, hasTenant } = useClinicScope();

  if (!hasTenant) {
    return (
      <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm">
        <p className="font-medium text-destructive">Tenant required</p>
        <p className="mt-1 text-muted-foreground">Select or activate a clinic tenant to load scoped data.</p>
      </div>
    );
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
      <span className="font-medium text-foreground">Tenant</span>
      <span>{tenant?.name ?? "Clinic"}</span>
      {tenantId ? <span className="font-mono">({tenantId.slice(0, 8)}…)</span> : null}
    </div>
  );
}
