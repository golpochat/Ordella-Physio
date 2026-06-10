import { PortalReportsPage } from "@/components/reporting/portal-reports-page";

export default function StaffReportsPage() {
  return (
    <PortalReportsPage
      title="Reports"
      description="Read-only clinic reporting. Download completed reports from history."
      roles={["STAFF"]}
    />
  );
}
