import { PageHeader } from "@/components/dashboard/PageHeader";
import { UserProfileForm } from "@/components/users/UserProfileForm";

export default function ClinicProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your clinic admin account settings."
      />
      <UserProfileForm />
    </>
  );
}
