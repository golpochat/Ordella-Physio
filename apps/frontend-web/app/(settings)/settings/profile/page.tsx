import { PageHeader } from "@/components/dashboard/PageHeader";
import { AccountProfilePanel } from "@/components/profile/AccountProfilePanel";

export default function ProfileSettingsPage() {
  return (
    <>
      <PageHeader title="Profile" subtitle="Manage your account settings." />
      <AccountProfilePanel />
    </>
  );
}
