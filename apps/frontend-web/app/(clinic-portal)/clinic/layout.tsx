import { ClinicPortalShell } from "@/components/clinic-portal/clinic-portal-shell";

export default function ClinicPortalLayout({ children }: { children: React.ReactNode }) {
  return <ClinicPortalShell>{children}</ClinicPortalShell>;
}
