import { ClinicRoleAssignment } from "@/components/clinic-portal/role-assignment";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function ClinicRolesPage() {
  return (
    <>
      <PageHeader
        title="Role assignments"
        subtitle="Assign and manage clinic roles for team members."
      />
      <ClinicRoleAssignment />
    </>
  );
}
