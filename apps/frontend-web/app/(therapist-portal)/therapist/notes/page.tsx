"use client";

import { TherapistNotesList } from "@/components/therapist-portal/notes-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useTherapistNotes } from "@/hooks/useTherapistPortal";

export default function TherapistNotesPage() {
  const { data, isLoading, isError, refetch } = useTherapistNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Clinical notes</h1>
        <p className="text-muted-foreground">Create, edit, and manage patient documentation.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <TherapistNotesList notes={data ?? []} /> : null}
    </div>
  );
}
