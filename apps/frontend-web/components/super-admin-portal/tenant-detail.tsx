"use client";



import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

import { TenantStatusBadge } from "@/components/super-admin/tenants/TenantStatusBadge";

import { TenantStatusActions } from "@/components/tenants/TenantStatusActions";

import { useDeletePlatformTenant } from "@/hooks/useSuperAdminPortal";

import type { PlatformTenant } from "@/lib/super-admin-portal-types";

import { formatPortalDateTime } from "@/lib/super-admin-portal-utils";



export function PlatformTenantDetail({ tenant }: { tenant: PlatformTenant }) {

  const router = useRouter();

  const deleteTenant = useDeletePlatformTenant();

  const status = tenant.status ?? (tenant.isActive ? "ACTIVE" : "SUSPENDED");



  return (

    <div className="space-y-4">

      <Card>

        <CardHeader>

          <div className="flex flex-wrap items-center gap-2">

            <CardTitle>{tenant.name}</CardTitle>

            <TenantStatusBadge status={status} isActive={tenant.isActive} />

          </div>

        </CardHeader>

        <CardBody className="space-y-3 text-sm">

          <p>

            <span className="text-muted-foreground">Code:</span> {tenant.code ?? tenant.slug}

          </p>

          <p>

            <span className="text-muted-foreground">Timezone:</span> {tenant.timezone}

          </p>

          <p>

            <span className="text-muted-foreground">Currency:</span> {tenant.currency}

          </p>

          {tenant.address ? (

            <p>

              <span className="text-muted-foreground">Address:</span> {tenant.address}

            </p>

          ) : null}

          {tenant.phone ? (

            <p>

              <span className="text-muted-foreground">Phone:</span> {tenant.phone}

            </p>

          ) : null}

          <p className="text-muted-foreground">Created {formatPortalDateTime(tenant.createdAt)}</p>

          <p className="text-muted-foreground">Updated {formatPortalDateTime(tenant.updatedAt)}</p>

        </CardBody>

      </Card>



      <div className="flex flex-wrap gap-3">

        <Button asChild className="btn-primary">

          <Link href={`/super-admin/tenants/${tenant.id}/edit`}>Edit tenant</Link>

        </Button>

        <Button asChild variant="outline">

          <Link href={`/super-admin/tenants/${tenant.id}/billing`}>Billing settings</Link>

        </Button>

        <Button asChild variant="outline">

          <Link href={`/super-admin/tenants/${tenant.id}/localization`}>Localization</Link>

        </Button>

        <Button asChild variant="outline">

          <Link href={`/super-admin/tenants/${tenant.id}/domains`}>Domains</Link>

        </Button>

        <Button asChild variant="outline">

          <Link href={`/super-admin/tenants/${tenant.id}/config`}>Configuration</Link>

        </Button>

        <TenantStatusActions tenant={tenant} />

        <Button

          variant="destructive"

          disabled={deleteTenant.isPending}

          onClick={() => {

            if (!window.confirm("Suspend this tenant? All users will lose access.")) return;

            deleteTenant.mutate(tenant.id, {

              onSuccess: () => {

                toast.success("Tenant suspended successfully.");

                router.push("/super-admin/tenants");

              },

              onError: () => toast.error("Failed to suspend tenant"),

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

