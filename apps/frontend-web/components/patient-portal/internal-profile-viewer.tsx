"use client";

import { PatientProfileViewer } from "@/components/clinic-ui";
import { ProfileAvatarSection } from "@/components/profile/ProfileAvatarSection";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePatientProfile } from "@/hooks/usePatientPortal";
import { useAuthStore } from "@/store/auth.store";

export function InternalProfileViewer() {
  const user = useAuthStore((state) => state.user);
  const { data: profile, isLoading, isError, refetch } = usePatientProfile();
  const source = profile ?? user;

  if (!source && isLoading) {
    return <PageLoading rows={4} />;
  }

  if (!source && isError) {
    return <PageError onRetry={() => void refetch()} />;
  }

  if (!source) {
    return <PageError message="Profile unavailable." />;
  }

  return (
    <div className="space-y-6">
      <ProfileAvatarSection
        firstName={source.firstName}
        lastName={source.lastName}
        email={source.email}
      />
      <PatientProfileViewer
      patient={{
        id: source.id,
        tenantId: "tenantId" in source ? source.tenantId : user?.tenantId,
        firstName: source.firstName ?? "",
        lastName: source.lastName ?? "",
        email: source.email,
      }}
      showTenantBanner
      footerNote="Internal read-only profile viewer for the signed-in patient user."
    />
    </div>
  );
}
