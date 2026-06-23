"use client";

import { ListPage } from "@/components/dashboard/ListPage";
import { UserNotesList } from "@/components/user-portal/notes-list";
import { useUserNotes } from "@/hooks/useUserPortal";

export default function UserNotesPage() {
  const { data, isLoading, isError, refetch } = useUserNotes();

  return (
    <ListPage
      title="Notes"
      subtitle="Read-only view of notes shared with you."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <UserNotesList notes={data ?? []} />
    </ListPage>
  );
}
