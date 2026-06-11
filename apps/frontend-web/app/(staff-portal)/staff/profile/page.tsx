import { PageHeader } from "@/components/dashboard/PageHeader";
import { StaffProfileForm } from "@/components/staff-portal/profile-form";

export default function StaffProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your staff account settings."
      />
      <StaffProfileForm />
    </>
  );
}
