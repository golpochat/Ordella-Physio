"use client";

import { ClinicNoteDetailView } from "@/components/clinic-portal/note-detail-view";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicNote } from "@/hooks/useClinicPortal";

type ClinicNoteDetailPageProps = {
  params: { id: string };
};

export default function ClinicNoteDetailPage({ params }: ClinicNoteDetailPageProps) {
  const { data, isLoading, isError, refetch } = useClinicNote(params.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Note detail</h1>
      </div>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <ClinicNoteDetailView note={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Note not found." /> : null}
    </div>
  );
}
