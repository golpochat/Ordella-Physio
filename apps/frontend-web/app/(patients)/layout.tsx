import { PortalShell } from "@/components/layout/portal-shell";

export default function PatientsLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
