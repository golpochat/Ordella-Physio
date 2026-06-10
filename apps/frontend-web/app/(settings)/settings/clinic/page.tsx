import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClinicSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Clinic settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Clinic profile</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">Tenant-aware clinic configuration scaffold.</p>
        </CardBody>
      </Card>
    </div>
  );
}
