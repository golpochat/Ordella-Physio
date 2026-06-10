import { PortalReportsPage } from "@/components/reporting/portal-reports-page";

export default function ClinicReportsPage() {
  return (
    <PortalReportsPage
      title="Reports"
      description="Operational, financial, and clinical reporting for your clinic."
      roles={["ADMIN"]}
    />
  );
}
