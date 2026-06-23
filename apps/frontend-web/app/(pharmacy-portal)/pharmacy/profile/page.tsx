import { PageHeader } from "@/components/dashboard/PageHeader";
import { AccountProfilePanel } from "@/components/profile/AccountProfilePanel";

export default function PharmacyProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your pharmacy account settings."
      />
      <AccountProfilePanel />
    </>
  );
}
