import { UserPortalShell } from "@/components/user-portal/user-portal-shell";

export default function UserPortalLayout({ children }: { children: React.ReactNode }) {
  return <UserPortalShell>{children}</UserPortalShell>;
}
