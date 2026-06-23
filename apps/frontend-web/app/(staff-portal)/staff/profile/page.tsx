import { PageHeader } from "@/components/dashboard/PageHeader";
import { AccountProfilePanel } from "@/components/profile/AccountProfilePanel";

export default function StaffProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your staff account settings."
      />
      <AccountProfilePanel />
    </>
  );
}
