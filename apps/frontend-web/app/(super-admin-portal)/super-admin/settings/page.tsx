import { PlatformSettingsForm } from "@/components/super-admin-portal/settings-form";

export default function SuperAdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Platform configuration and admin profile.</p>
      </div>
      <PlatformSettingsForm />
    </div>
  );
}
