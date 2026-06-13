import Link from "next/link";
import { DashboardPlaceholder } from "@/components/dashboard/dashboard-placeholder";
import { RoleGuard } from "@/components/navigation/role-guard";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["OWNER", "ADMIN"]}>
      <div className="space-y-4">
        <DashboardPlaceholder
          title="Admin Dashboard"
          description="Tenant administration, staff management, and organization settings."
        />
        <div className="automation-builder-actions">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/ai/dashboard">AI platform</Link>
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/revenue">Revenue analytics</Link>
          </Button>
        </div>
      </div>
    </RoleGuard>
  );
}
