import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleGuard } from "@/components/navigation/role-guard";

export default function PatientPortalPage() {
  return (
    <RoleGuard allowedRoles={["PATIENT"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Patient Portal</h1>
          <p className="text-muted-foreground">
            Scaffold for appointments, invoices, and read-only notes.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Upcoming appointments", "Invoices", "Care notes"].map((title) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Read-only patient view</CardDescription>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-muted-foreground">Data loads via React Query hooks.</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
