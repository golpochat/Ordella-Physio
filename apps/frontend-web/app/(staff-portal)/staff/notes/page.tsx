"use client";

import { StaffNotesList } from "@/components/staff-portal/notes-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useStaffNotes } from "@/hooks/useStaffPortal";

export default function StaffNotesPage() {
  const { data, isLoading, isError, refetch } = useStaffNotes();

  return (
    <ListPage
      title="Clinical notes"
      subtitle="Read-only reference for front-desk staff."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <StaffNotesList notes={data ?? []} />
    </ListPage>
  );
}
