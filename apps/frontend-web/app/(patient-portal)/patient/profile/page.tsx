import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProfileForm } from "@/components/patient-portal/profile-form";

export default function PatientProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your account details."
      />
      <ProfileForm />
    </>
  );
}
