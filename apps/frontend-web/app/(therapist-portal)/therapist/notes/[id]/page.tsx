"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TherapistNoteDetailView } from "@/components/therapist-portal/note-detail-view";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useTherapistNote } from "@/hooks/useTherapistPortal";

type TherapistNoteDetailPageProps = {
  params: { id: string };
};

export default function TherapistNoteDetailPage({ params }: TherapistNoteDetailPageProps) {
  const { data, isLoading, isError, refetch } = useTherapistNote(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/therapist/notes">&larr; Back to notes</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <TherapistNoteDetailView note={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Note not found." /> : null}
    </div>
  );
}
