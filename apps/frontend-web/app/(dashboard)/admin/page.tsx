import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleGuard } from "@/components/navigation/role-guard";

const METRICS = [
  { label: "Tenants", value: 12 },
  { label: "Staff", value: 84 },
  { label: "Active", value: 67 },
];

const DISTRIBUTION = [
  { name: "Clinics", value: 8 },
  { name: "Therapists", value: 42 },
  { name: "Patients", value: 320 },
];

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["SYSTEM", "OWNER"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Admin Portal</h1>
          <p className="text-muted-foreground">Scaffold for tenants, staff, and system metrics.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>System metrics</CardTitle>
            </CardHeader>
            <CardBody>
              <BarChart data={METRICS} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Population overview</CardTitle>
            </CardHeader>
            <CardBody>
              <DonutChart data={DISTRIBUTION} />
            </CardBody>
          </Card>
        </div>
      </div>
    </RoleGuard>
  );
}
