import { ClinicProfileForm } from "@/components/clinic-portal/profile-form";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function ClinicProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your clinic admin account settings."
      />
      <ClinicProfileForm />
    </>
  );
}
