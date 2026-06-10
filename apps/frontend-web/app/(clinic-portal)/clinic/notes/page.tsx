"use client";

import { ClinicNotesList } from "@/components/clinic-portal/notes-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicNotes } from "@/hooks/useClinicPortal";

export default function ClinicNotesPage() {
  const { data, isLoading, isError, refetch } = useClinicNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Clinical notes</h1>
        <p className="text-muted-foreground">Read-only oversight of therapist documentation.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <ClinicNotesList notes={data ?? []} /> : null}
    </div>
  );
}
