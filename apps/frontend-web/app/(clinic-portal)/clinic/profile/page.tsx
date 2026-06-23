import { PageHeader } from "@/components/dashboard/PageHeader";
import { AccountProfilePanel } from "@/components/profile/AccountProfilePanel";

export default function ClinicProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your clinic admin account settings."
      />
      <AccountProfilePanel />
    </>
  );
}
