import { ProtectedRoute } from "@/components/navigation/protected-route";
import { RoleGuard } from "@/components/navigation/role-guard";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MAIN_NAV_LINKS } from "@/lib/navigation";

export function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RoleGuard>
        <div className="flex min-h-screen">
          <Sidebar links={MAIN_NAV_LINKS} />
          <MobileNav links={MAIN_NAV_LINKS} />
          <div className="flex min-h-screen flex-1 flex-col">
            <Topbar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
