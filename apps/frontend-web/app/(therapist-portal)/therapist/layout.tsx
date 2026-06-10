import { TherapistPortalShell } from "@/components/therapist-portal/therapist-portal-shell";

export default function TherapistPortalLayout({ children }: { children: React.ReactNode }) {
  return <TherapistPortalShell>{children}</TherapistPortalShell>;
}
