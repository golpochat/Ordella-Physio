import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
