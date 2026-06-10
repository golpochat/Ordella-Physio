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
          <div className="flex h-20 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            Coming soon
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Collections</CardTitle>
          <CardDescription>Payment collection rate</CardDescription>
        </CardHeader>
        <CardBody>
          <div className="flex h-20 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            Coming soon
          </div>
        </CardBody>
      </Card>
      <p className="text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
        Global billing overview is placeholder UI until the platform billing aggregation API is
        available.
      </p>
    </div>
  );
}
