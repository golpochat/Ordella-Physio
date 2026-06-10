"use client";

import { UserNotesList } from "@/components/user-portal/notes-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useUserNotes } from "@/hooks/useUserPortal";

export default function UserNotesPage() {
  const { data, isLoading, isError, refetch } = useUserNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notes</h1>
        <p className="text-muted-foreground">Read-only view of notes shared with you.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <UserNotesList notes={data ?? []} /> : null}
    </div>
  );
}
