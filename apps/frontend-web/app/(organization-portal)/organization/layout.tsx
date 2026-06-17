import { OrganizationPortalShell } from "@/components/organization-portal/organization-portal-shell";

export default function OrganizationPortalLayout({ children }: { children: React.ReactNode }) {
  return <OrganizationPortalShell>{children}</OrganizationPortalShell>;
}
