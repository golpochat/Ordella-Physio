"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PharmacyFulfillmentOrder } from "@/lib/pharmacy-portal-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";

export function PharmacyFulfillmentList({ orders }: { orders: PharmacyFulfillmentOrder[] }) {
  if (!orders.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No fulfillment orders</p>
        <p className="mt-2">Medication orders ready for preparation will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Placeholder data — fulfillment workflow integration coming soon.
      </p>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{order.medication}</p>
                <Badge>{order.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{order.patientName}</p>
              {order.appointmentId ? (
                <p className="text-sm text-muted-foreground">
                  Appointment: {order.appointmentId}
                </p>
              ) : null}
              <p className="text-xs text-muted-foreground">
                Updated {formatPortalDateTime(order.updatedAt)}
              </p>
            </div>
            <Link
              href={`/pharmacy/fulfillment/${order.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View order
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
