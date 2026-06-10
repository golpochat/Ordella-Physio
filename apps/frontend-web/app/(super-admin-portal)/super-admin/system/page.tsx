import { PlatformSystemHealth } from "@/components/super-admin-portal/system-health";

export default function SuperAdminSystemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">System health</h1>
        <p className="text-muted-foreground">Monitor microservice availability.</p>
      </div>
      <PlatformSystemHealth />
    </div>
  );
}
