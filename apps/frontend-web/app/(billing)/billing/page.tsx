import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">Scaffold billing overview and invoice navigation.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Revenue summary</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">Connect to /api/billing for clinic billing data.</p>
        </CardBody>
      </Card>
    </div>
  );
}
