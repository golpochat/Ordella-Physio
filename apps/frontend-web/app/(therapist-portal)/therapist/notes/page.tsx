"use client";

import { TherapistNotesList } from "@/components/therapist-portal/notes-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useTherapistNotes } from "@/hooks/useTherapistPortal";

export default function TherapistNotesPage() {
  const { data, isLoading, isError, refetch } = useTherapistNotes();

  return (
    <ListPage
      title="Clinical notes"
      subtitle="Create, edit, and manage patient documentation."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <TherapistNotesList notes={data ?? []} />
    </ListPage>
  );
}
