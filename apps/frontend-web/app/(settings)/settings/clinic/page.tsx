import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClinicSettingsPage() {
  return (
    <>
      <PageHeader
        title="Clinic settings"
        subtitle="Tenant-aware clinic configuration and branding."
      />
      <Card>
        <CardHeader>
          <CardTitle>Clinic profile</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">
            Tenant-aware clinic configuration scaffold.
          </p>
        </CardBody>
      </Card>
    </>
  );
}
