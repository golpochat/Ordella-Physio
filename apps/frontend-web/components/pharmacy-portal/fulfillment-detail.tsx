"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PharmacyFulfillmentWorkflow } from "@/components/pharmacy-portal/fulfillment-workflow";
import type { PharmacyFulfillmentOrder } from "@/lib/pharmacy-portal-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";

export function PharmacyFulfillmentDetail({ order }: { order: PharmacyFulfillmentOrder }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{order.medicationName}</CardTitle>
            <Badge>{order.fulfillment?.status ?? order.status}</Badge>
          </div>
        </CardHeader>
        <CardBody className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Patient</p>
            <p className="text-muted-foreground">{order.patientId}</p>
          </div>
          <div>
            <p className="font-medium">Prescription</p>
            <p className="text-muted-foreground">{order.id}</p>
          </div>
          <div>
            <p className="font-medium">Last updated</p>
            <p className="text-muted-foreground">{formatPortalDateTime(order.updatedAt)}</p>
          </div>
        </CardBody>
      </Card>

      <PharmacyFulfillmentWorkflow prescription={order} />

      <Button asChild variant="outline">
        <Link href="/pharmacy/fulfillment">Back to fulfillment</Link>
      </Button>
    </div>
  );
}
