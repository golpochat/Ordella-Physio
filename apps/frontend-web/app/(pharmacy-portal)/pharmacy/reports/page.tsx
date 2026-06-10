import { PortalReportsPage } from "@/components/reporting/portal-reports-page";

export default function PharmacyReportsPage() {
  return (
    <PortalReportsPage
      title="Reports"
      description="Limited billing and patient activity reporting for pharmacy operations."
      roles={["PHARMACY"]}
    />
  );
}
