"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  useDeletePlatformTenant,
  useSetPlatformTenantActive,
  useUpdatePlatformTenant,
} from "@/hooks/useSuperAdminPortal";
import type { PlatformTenant } from "@/lib/super-admin-portal-types";
import { formatPortalDateTime } from "@/lib/super-admin-portal-utils";

export function PlatformTenantDetail({ tenant }: { tenant: PlatformTenant }) {
  const router = useRouter();
  const updateTenant = useUpdatePlatformTenant(tenant.id);
  const setTenantActive = useSetPlatformTenantActive(tenant.id);
  const deleteTenant = useDeletePlatformTenant();
  const [name, setName] = useState(tenant.name);
  const [timezone, setTimezone] = useState(tenant.timezone);
  const [currency, setCurrency] = useState(tenant.currency);
  const [address, setAddress] = useState(tenant.address ?? "");
  const [phone, setPhone] = useState(tenant.phone ?? "");

  useEffect(() => {
    setName(tenant.name);
    setTimezone(tenant.timezone);
    setCurrency(tenant.currency);
    setAddress(tenant.address ?? "");
    setPhone(tenant.phone ?? "");
  }, [tenant]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{tenant.name}</CardTitle>
            <Badge>{tenant.isActive ? "Active" : "Inactive"}</Badge>
          </div>
        </CardHeader>
        <CardBody>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              updateTenant.mutate(
                {
                  name,
                  timezone,
                  currency,
                  address: address || undefined,
                  phone: phone || undefined,
                },
                {
                  onSuccess: () => toast.success("Tenant updated"),
                  onError: () => toast.error("Failed to update tenant"),
                },
              );
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(event) => setName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={tenant.slug} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Created {formatPortalDateTime(tenant.createdAt)}</p>
              <p>Updated {formatPortalDateTime(tenant.updatedAt)}</p>
            </div>
            <Button type="submit" disabled={updateTenant.isPending}>
              {updateTenant.isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          disabled={setTenantActive.isPending}
          onClick={() => {
            const action = tenant.isActive ? "deactivate" : "activate";
            if (!window.confirm(`${action} this tenant?`)) return;
            setTenantActive.mutate(!tenant.isActive, {
              onSuccess: () => toast.success(`Tenant ${action}d`),
              onError: () => toast.error(`Failed to ${action} tenant`),
            });
          }}
        >
          {tenant.isActive ? "Deactivate" : "Activate"}
        </Button>
        <Button
          variant="destructive"
          disabled={deleteTenant.isPending}
          onClick={() => {
            if (!window.confirm("Deactivate this tenant?")) return;
            deleteTenant.mutate(tenant.id, {
              onSuccess: () => {
                toast.success("Tenant deactivated");
                router.push("/super-admin/tenants");
              },
              onError: () => toast.error("Failed to deactivate tenant"),
            });
          }}
        >
          Remove tenant
        </Button>
        <Button asChild variant="outline">
          <Link href="/super-admin/tenants">Back to tenants</Link>
        </Button>
      </div>
    </div>
  );
}
