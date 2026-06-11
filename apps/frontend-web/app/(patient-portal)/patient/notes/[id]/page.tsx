"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoteDetail } from "@/components/patient-portal/note-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePatientNote } from "@/hooks/usePatientPortal";

type PatientNoteDetailPageProps = {
  params: { id: string };
};

export default function PatientNoteDetailPage({ params }: PatientNoteDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePatientNote(params.id);

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/patient/notes">&larr; Back to notes</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <NoteDetail note={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Note not found." /> : null}
    </>
  );
}
