"use client";

import { ReportingCenter } from "@/components/reporting/reporting-center";
import { resolveUserRoles, type PortalRole } from "@/lib/rbac";
import { useAuthStore } from "@/store/auth.store";

type PortalReportsPageProps = {
  title?: string;
  description?: string;
  roles?: PortalRole[];
};

export function PortalReportsPage({ title, description, roles }: PortalReportsPageProps) {
  const user = useAuthStore((state) => state.user);
  const resolvedRoles = roles ?? resolveUserRoles(user ?? {});

  return <ReportingCenter roles={resolvedRoles} title={title} description={description} />;
}
