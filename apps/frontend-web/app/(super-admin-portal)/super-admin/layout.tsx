import { SuperAdminPortalShell } from "@/components/super-admin-portal/super-admin-portal-shell";

export default function SuperAdminPortalLayout({ children }: { children: React.ReactNode }) {
  return <SuperAdminPortalShell>{children}</SuperAdminPortalShell>;
}
