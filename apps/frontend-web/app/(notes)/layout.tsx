import { PortalShell } from "@/components/layout/portal-shell";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
