import { PageHeader } from "@/components/dashboard/PageHeader";
import { SettingsForm } from "@/components/super-admin/settings/SettingsForm";

export default function SuperAdminSettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Platform configuration and admin profile."
      />
      <SettingsForm />
    </>
  );
}
