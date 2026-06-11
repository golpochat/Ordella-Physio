"use client";

import { ClinicNoteDetailView } from "@/components/clinic-portal/note-detail-view";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicNote } from "@/hooks/useClinicPortal";

type ClinicNoteDetailPageProps = {
  params: { id: string };
};

export default function ClinicNoteDetailPage({ params }: ClinicNoteDetailPageProps) {
  const { data, isLoading, isError, refetch } = useClinicNote(params.id);

  return (
    <>
      <PageHeader title="Note detail" />

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <ClinicNoteDetailView note={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Note not found." /> : null}
    </>
  );
}
