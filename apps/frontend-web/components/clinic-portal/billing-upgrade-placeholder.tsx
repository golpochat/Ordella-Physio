"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function BillingUpgradePlaceholder() {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>Stripe billing integration</CardTitle>
          <Badge variant="outline">Coming soon</Badge>
        </div>
        <CardDescription>
          Secure subscription checkout, invoicing, and payment method management will be powered by
          Stripe. Your trial status and plan selection are already tracked in Ordella.
        </CardDescription>
      </CardHeader>
      <CardBody className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/pricing">Compare plans</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Talk to sales</Link>
        </Button>
      </CardBody>
    </Card>
  );
}
