"use client";

import { StaffNoteDetailView } from "@/components/staff-portal/note-detail-view";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffNote } from "@/hooks/useStaffPortal";

type StaffNoteDetailPageProps = {
  params: { id: string };
};

export default function StaffNoteDetailPage({ params }: StaffNoteDetailPageProps) {
  const { data, isLoading, isError, refetch } = useStaffNote(params.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Note detail</h1>
      </div>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <StaffNoteDetailView note={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Note not found." /> : null}
    </div>
  );
}
