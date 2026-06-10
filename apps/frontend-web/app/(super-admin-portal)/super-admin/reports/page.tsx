import { PortalReportsPage } from "@/components/reporting/portal-reports-page";

export default function SuperAdminReportsPage() {
  return (
    <PortalReportsPage
      title="Reports"
      description="Platform analytics, tenant usage, and global operational reporting."
      roles={["SYSTEM"]}
    />
  );
}
