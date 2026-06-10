import { LineChart } from "@/components/charts/line-chart";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleGuard } from "@/components/navigation/role-guard";

const APPOINTMENTS = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 9 },
  { label: "Thu", value: 15 },
  { label: "Fri", value: 11 },
];

export default function ClinicDashboardPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN", "STAFF"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Clinic Dashboard</h1>
          <p className="text-muted-foreground">
            Scaffold for appointments, patients, billing, and notes.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Weekly appointments</CardTitle>
          </CardHeader>
          <CardBody>
            <LineChart data={APPOINTMENTS} />
          </CardBody>
        </Card>
      </div>
    </RoleGuard>
  );
}
