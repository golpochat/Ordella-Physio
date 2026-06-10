"use client";

import { UserNoteDetailView } from "@/components/user-portal/note-detail-view";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useUserNote } from "@/hooks/useUserPortal";

type UserNoteDetailPageProps = {
  params: { id: string };
};

export default function UserNoteDetailPage({ params }: UserNoteDetailPageProps) {
  const { data, isLoading, isError, refetch } = useUserNote(params.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Note detail</h1>
      </div>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <UserNoteDetailView note={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Note not found." /> : null}
    </div>
  );
}
