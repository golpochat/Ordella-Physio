import { PageHeader } from "@/components/dashboard/PageHeader";
import { InternalProfileViewer } from "@/components/patient-portal/internal-profile-viewer";

export default function PatientProfilePage() {
  return (
    <>
      <PageHeader title="Profile" subtitle="Internal read-only profile viewer." />
      <InternalProfileViewer />
    </>
  );
}
