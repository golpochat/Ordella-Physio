import { PatientPortalShell } from "@/components/patient-portal/patient-portal-shell";

export default function PatientPortalLayout({ children }: { children: React.ReactNode }) {
  return <PatientPortalShell>{children}</PatientPortalShell>;
}
