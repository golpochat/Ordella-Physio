"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreatePlatformTenant } from "@/hooks/useSuperAdminPortal";

export function PlatformTenantCreateForm() {
  const router = useRouter();
  const createTenant = useCreatePlatformTenant();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create tenant</CardTitle>
        <CardDescription>Provision a new clinic tenant on the platform.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            createTenant.mutate(
              { name, slug, timezone, currency },
              {
                onSuccess: (tenant) => {
                  toast.success("Tenant created");
                  router.push(`/super-admin/tenants/${tenant.id}`);
                },
                onError: () => toast.error("Failed to create tenant"),
              },
            );
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                required
              />
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
          </div>
          <Button type="submit" disabled={createTenant.isPending}>
            {createTenant.isPending ? "Creating..." : "Create tenant"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
