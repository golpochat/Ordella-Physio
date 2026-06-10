import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PlatformReportsPlaceholder() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { title: "Tenant growth", description: "New tenants and churn over time." },
        { title: "Platform usage", description: "Active users and session volume." },
        { title: "Revenue analytics", description: "Subscription and invoice trends." },
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
