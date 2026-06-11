import { PageHeader } from "@/components/dashboard/PageHeader";
import { PharmacyProfileForm } from "@/components/pharmacy-portal/profile-form";

export default function PharmacyProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your pharmacy account settings."
      />
      <PharmacyProfileForm />
    </>
  );
}
