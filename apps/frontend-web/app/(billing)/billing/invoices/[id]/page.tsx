import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

type InvoiceDetailPageProps = {
  params: { id: string };
};

export default function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Invoice {params.id}</h1>
        <p className="text-muted-foreground">Invoice detail scaffold.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Line items</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">Fetch invoice via billing and payment proxies.</p>
        </CardBody>
      </Card>
    </div>
  );
}
