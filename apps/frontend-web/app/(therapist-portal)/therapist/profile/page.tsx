import { PageHeader } from "@/components/dashboard/PageHeader";
import { TherapistProfileForm } from "@/components/therapist-portal/profile-form";

export default function TherapistProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your therapist account settings."
      />
      <TherapistProfileForm />
    </>
  );
}
