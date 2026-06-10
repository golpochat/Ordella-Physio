"use client";

import { NotesList } from "@/components/patient-portal/notes-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePatientNotes } from "@/hooks/usePatientPortal";

export default function PatientNotesPage() {
  const { data, isLoading, isError, refetch } = usePatientNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Care notes</h1>
        <p className="text-muted-foreground">Read-only notes shared by your care team.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <NotesList notes={data ?? []} /> : null}
    </div>
  );
}
