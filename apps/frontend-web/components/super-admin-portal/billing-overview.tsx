import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PlatformBillingOverview({ invoiceCount }: { invoiceCount: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Total invoices</CardTitle>
          <CardDescription>Across all tenants</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold">{invoiceCount}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">MRR</CardTitle>
          <CardDescription>Monthly recurring revenue</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">
            Requires subscription-billing aggregation API (Stripe MRR via microservice stack).
          </p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Collections</CardTitle>
          <CardDescription>Payment collection rate</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">
            Requires subscription-billing aggregation API (Stripe MRR via microservice stack).
          </p>
        </CardBody>
      </Card>
      <p className="text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
        Invoice count is live. MRR and collections need subscription-billing platform aggregation
        (see repo docs/billing-architecture.md).
      </p>
    </div>
  );
}
