"use client";

import { StaffNotesList } from "@/components/staff-portal/notes-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffNotes } from "@/hooks/useStaffPortal";

export default function StaffNotesPage() {
  const { data, isLoading, isError, refetch } = useStaffNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Clinical notes</h1>
        <p className="text-muted-foreground">Read-only reference for front-desk staff.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <StaffNotesList notes={data ?? []} /> : null}
    </div>
  );
}
