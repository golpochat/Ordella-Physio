import { StaffPortalShell } from "@/components/staff-portal/staff-portal-shell";

export default function StaffPortalLayout({ children }: { children: React.ReactNode }) {
  return <StaffPortalShell>{children}</StaffPortalShell>;
}
