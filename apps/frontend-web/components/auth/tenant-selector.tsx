"use client";

import { useEffect, useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { fetchTenantDirectory, type TenantDirectoryEntry } from "@/lib/tenant-directory";
import { getDefaultTenantId } from "@/lib/tenant-config";

export type TenantSelectorProps = {
  value: string;
  onChange: (tenantId: string) => void;
};

export function TenantSelector({ value, onChange }: TenantSelectorProps) {
  const [tenants, setTenants] = useState<TenantDirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    void fetchTenantDirectory().then((entries) => {
      if (!active) {
        return;
      }

      setTenants(entries);
      setLoading(false);

      if (!value) {
        const defaultTenantId = getDefaultTenantId() ?? entries[0]?.id;
        if (defaultTenantId) {
          onChange(defaultTenantId);
        }
      }
    });

    return () => {
      active = false;
    };
  }, [onChange, value]);

  if (loading) {
    return (
      <div className="space-y-2">
        <Label htmlFor="tenantId">Clinic / tenant</Label>
        <Input id="tenantId" disabled placeholder="Loading tenants..." />
      </div>
    );
  }

  if (tenants.length > 1) {
    return (
      <div className="space-y-2">
        <Label htmlFor="tenantId">Clinic / tenant</Label>
        <select
          id="tenantId"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
        >
          <option value="" disabled>
            Select a clinic
          </option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="tenantId">Clinic / tenant ID</Label>
      <Input
        id="tenantId"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="demo-tenant"
        required
      />
      {tenants[0] ? (
        <p className="text-xs text-muted-foreground">Default tenant: {tenants[0].name}</p>
      ) : null}
    </div>
  );
}
