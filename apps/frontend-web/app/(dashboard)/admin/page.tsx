import { DashboardPlaceholder } from "@/components/dashboard/dashboard-placeholder";
import { RoleGuard } from "@/components/navigation/role-guard";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["OWNER", "ADMIN"]}>
      <DashboardPlaceholder
        title="Admin Dashboard"
        description="Tenant administration, staff management, and organization settings."
      />
    </RoleGuard>
  );
}
