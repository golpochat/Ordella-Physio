"use client";

import { StaffNoteDetailView } from "@/components/staff-portal/note-detail-view";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffNote } from "@/hooks/useStaffPortal";

type StaffNoteDetailPageProps = {
  params: { id: string };
};

export default function StaffNoteDetailPage({ params }: StaffNoteDetailPageProps) {
  const { data, isLoading, isError, refetch } = useStaffNote(params.id);

  return (
    <>
      <PageHeader title="Note detail" />

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <StaffNoteDetailView note={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Note not found." /> : null}
    </>
  );
}
