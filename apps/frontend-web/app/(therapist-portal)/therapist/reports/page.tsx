import { PortalReportsPage } from "@/components/reporting/portal-reports-page";

export default function TherapistReportsPage() {
  return (
    <PortalReportsPage
      title="Reports"
      description="Limited therapist activity and clinical reporting."
      roles={["THERAPIST"]}
    />
  );
}
