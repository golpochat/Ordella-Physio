"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationStatusActions } from "@/components/locations/LocationStatusActions";
import { LocationStatusBadge } from "@/components/locations/LocationStatusBadge";
import type { ClinicLocation } from "@/lib/clinic-portal-types";

function formatAddress(location: ClinicLocation): string {
  const parts = [
    location.addressLine1,
    location.addressLine2,
    location.city,
    location.state,
    location.postalCode,
    location.country,
  ].filter(Boolean);

  return parts.join(", ");
}

export type LocationDetailProps = {
  location: ClinicLocation;
};

export function LocationDetail({ location: initialLocation }: LocationDetailProps) {
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{location.name}</CardTitle>
            <LocationStatusBadge status={location.status} />
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Code</dt>
              <dd className="dashboard-cell-primary">{location.code}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Timezone</dt>
              <dd className="dashboard-cell-muted">{location.timezone}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-muted-foreground">Address</dt>
              <dd className="dashboard-cell-muted">{formatAddress(location)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Phone</dt>
              <dd className="dashboard-cell-muted">{location.phone ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd className="dashboard-cell-muted">{location.email ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Status</dt>
              <dd>
                <LocationStatusBadge status={location.status} />
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            <LocationStatusActions location={location} onStatusChange={setLocation} />
            <Button asChild variant="outline">
              <Link href={`/clinic/locations/${location.id}/edit`}>Edit location</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/clinic/locations/${location.id}/config`}>Configuration</Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
