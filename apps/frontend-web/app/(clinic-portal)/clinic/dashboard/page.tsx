"use client";

import { ReportingDashboard } from "@/components/dashboard/ReportingDashboard";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicDashboardPage() {
  return (
    <WithPermission permission="reporting.read">
      <ReportingDashboard />
    </WithPermission>
  );
}
