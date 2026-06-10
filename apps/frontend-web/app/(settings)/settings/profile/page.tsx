import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Profile settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">Profile form scaffold.</p>
        </CardBody>
      </Card>
    </div>
  );
}
