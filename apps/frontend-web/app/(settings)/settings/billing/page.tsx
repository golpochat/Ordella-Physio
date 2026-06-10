import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Billing settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment preferences</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">Billing and payment integration scaffold.</p>
        </CardBody>
      </Card>
    </div>
  );
}
