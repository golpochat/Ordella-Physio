import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleGuard } from "@/components/navigation/role-guard";

export default function TherapistDashboardPage() {
  return (
    <RoleGuard allowedRoles={["THERAPIST"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Therapist Dashboard</h1>
          <p className="text-muted-foreground">Scaffold for schedule, notes, and patients.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Today's schedule", "Patient caseload", "Clinical notes"].map((title) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Placeholder module</CardDescription>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-muted-foreground">Connect to appointment and notes APIs.</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
