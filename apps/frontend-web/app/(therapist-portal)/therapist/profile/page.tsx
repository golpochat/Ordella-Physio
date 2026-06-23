import { PageHeader } from "@/components/dashboard/PageHeader";
import { AccountProfilePanel } from "@/components/profile/AccountProfilePanel";

export default function TherapistProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your therapist account settings."
      />
      <AccountProfilePanel />
    </>
  );
}
