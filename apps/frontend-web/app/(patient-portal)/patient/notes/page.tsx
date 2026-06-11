"use client";

import { NotesList } from "@/components/patient-portal/notes-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePatientNotes } from "@/hooks/usePatientPortal";

export default function PatientNotesPage() {
  const { data, isLoading, isError, refetch } = usePatientNotes();

  return (
    <ListPage
      title="Care notes"
      subtitle="Read-only notes shared by your care team."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <NotesList notes={data ?? []} />
    </ListPage>
  );
}
