"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { SavedReportsTable } from "@/components/reports/saved/SavedReportsTable";
import { useSavedReports } from "@/hooks/useReports";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicSavedReportsPage() {
  const { data, isLoading, isError } = useSavedReports({ limit: 100 });

  return (
    <WithPermission permission="reporting.read">
      <PageHeader
        title="Saved reports"
        subtitle="Reopen saved filter configurations or manage report definitions."
      />
      {isError ? (
        <p className="dashboard-empty">Failed to load saved reports. Please try again.</p>
      ) : (
        <SavedReportsTable reports={data?.items ?? []} isLoading={isLoading} />
      )}
    </WithPermission>
  );
}
