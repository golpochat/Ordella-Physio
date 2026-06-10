import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ClinicReportsPlaceholder() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { title: "Appointment volume", description: "Weekly and monthly session trends." },
        { title: "Revenue summary", description: "Invoice totals and collection rates." },
        { title: "Patient retention", description: "New vs returning patient metrics." },
      ].map((report) => (
        <Card key={report.title}>
          <CardHeader>
            <CardTitle className="text-base">{report.title}</CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              Report coming soon
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
