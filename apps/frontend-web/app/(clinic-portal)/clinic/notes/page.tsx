"use client";

import { ClinicNotesList } from "@/components/clinic-portal/notes-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useClinicNotes } from "@/hooks/useClinicPortal";

export default function ClinicNotesPage() {
  const { data, isLoading, isError, refetch } = useClinicNotes();

  return (
    <ListPage
      title="Clinical notes"
      subtitle="Read-only oversight of therapist documentation."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <ClinicNotesList notes={data ?? []} />
    </ListPage>
  );
}
