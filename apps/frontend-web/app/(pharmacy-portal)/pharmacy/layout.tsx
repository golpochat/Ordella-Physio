import { PharmacyPortalShell } from "@/components/pharmacy-portal/pharmacy-portal-shell";

export default function PharmacyPortalLayout({ children }: { children: React.ReactNode }) {
  return <PharmacyPortalShell>{children}</PharmacyPortalShell>;
}
