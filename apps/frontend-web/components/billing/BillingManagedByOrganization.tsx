"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BillingTruthContext } from "@/lib/clinic-portal-types";

type BillingManagedByOrganizationProps = {
  context: BillingTruthContext;
};

export function BillingManagedByOrganization({ context }: BillingManagedByOrganizationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing managed by organization</CardTitle>
        <CardDescription>
          Platform subscription, invoices, and payment methods for this clinic are managed at the
          organization level.
        </CardDescription>
      </CardHeader>
      <CardBody className="space-y-3">
        {context.organizationName ? (
          <p>
            Organization: <strong>{context.organizationName}</strong>
          </p>
        ) : null}
        <p className="tenant-create-form-field-hint">
          Billing admin: organization primary contact. Tenant owners cannot modify organization-level
          billing.
        </p>
        <Button asChild className="btn-primary">
          <Link href={context.organizationBillingPath}>View organization billing</Link>
        </Button>
      </CardBody>
    </Card>
  );
}
