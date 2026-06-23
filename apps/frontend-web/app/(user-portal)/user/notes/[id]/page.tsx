"use client";

import { ListPage } from "@/components/dashboard/ListPage";
import { UserNoteDetailView } from "@/components/user-portal/note-detail-view";
import { PageError } from "@/components/patient-portal/page-state";
import { useUserNote } from "@/hooks/useUserPortal";

type UserNoteDetailPageProps = {
  params: { id: string };
};

export default function UserNoteDetailPage({ params }: UserNoteDetailPageProps) {
  const { data, isLoading, isError, refetch } = useUserNote(params.id);

  return (
    <ListPage
      title="Note detail"
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
      loadingRows={2}
    >
      {data ? <UserNoteDetailView note={data} /> : <PageError message="Note not found." />}
    </ListPage>
  );
}
