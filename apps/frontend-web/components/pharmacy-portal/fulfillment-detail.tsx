import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { PharmacyFulfillmentOrder } from "@/lib/pharmacy-portal-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";

export function PharmacyFulfillmentDetail({ order }: { order: PharmacyFulfillmentOrder }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{order.medication}</CardTitle>
            <Badge>{order.status}</Badge>
          </div>
        </CardHeader>
        <CardBody className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Patient</p>
            <p className="text-muted-foreground">{order.patientName}</p>
          </div>
          <div>
            <p className="font-medium">Prescription</p>
            <p className="text-muted-foreground">{order.prescriptionId}</p>
          </div>
          {order.appointmentId ? (
            <div>
              <p className="font-medium">Linked appointment</p>
              <p className="text-muted-foreground">{order.appointmentId}</p>
            </div>
          ) : null}
          <div>
            <p className="font-medium">Last updated</p>
            <p className="text-muted-foreground">{formatPortalDateTime(order.updatedAt)}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Placeholder detail — status updates will be wired when fulfillment API is available.
          </p>
        </CardBody>
      </Card>
      <Button asChild variant="outline">
        <Link href="/pharmacy/fulfillment">Back to fulfillment</Link>
      </Button>
    </div>
  );
}
