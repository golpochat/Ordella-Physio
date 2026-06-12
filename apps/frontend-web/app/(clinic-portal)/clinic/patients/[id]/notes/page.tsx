"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { PatientNoteEditor } from "@/components/patients/notes/PatientNoteEditor";
import { PatientNotesList } from "@/components/patients/notes/PatientNotesList";
import { useClinicPatient, useClinicPatientNotesList } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parsePatientNoteListErrors } from "@/lib/clinic-patient-api-errors";
import type { ClinicPatientNote, ClinicPatientNoteListFilters } from "@/lib/clinic-portal-types";
import { getPatientDisplayName } from "@/lib/clinic-portal-utils";

const DEFAULT_LIMIT = 20;

type ClinicPatientNotesPageProps = {
  params: { id: string };
};

function readFilters(searchParams: URLSearchParams): ClinicPatientNoteListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const noteType = (searchParams.get("noteType")?.trim().toUpperCase() || undefined) as
    | ClinicPatientNoteListFilters["noteType"]
    | undefined;
  const staffId = searchParams.get("staffId")?.trim() || undefined;
  const createdFrom = searchParams.get("createdFrom")?.trim() || undefined;
  const createdTo = searchParams.get("createdTo")?.trim() || undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    noteType,
    staffId,
    createdFrom,
    createdTo,
  };
}

function buildSearchParams(filters: ClinicPatientNoteListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.noteType) {
    params.set("noteType", filters.noteType);
  }

  if (filters.staffId) {
    params.set("staffId", filters.staffId);
  }

  if (filters.createdFrom) {
    params.set("createdFrom", filters.createdFrom);
  }

  if (filters.createdTo) {
    params.set("createdTo", filters.createdTo);
  }

  return params;
}

export default function ClinicPatientNotesPage({ params }: ClinicPatientNotesPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);

  const patientQuery = useClinicPatient(params.id);
  const notesQuery = useClinicPatientNotesList(params.id, filters);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<ClinicPatientNote | null>(null);

  useEffect(() => {
    if (!notesQuery.error) {
      return;
    }

    const parsed = parsePatientNoteListErrors(notesQuery.error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.patientNotFound) {
      toast.error(parsed.toastError ?? "Patient does not exist.");
      router.replace("/clinic/patients");
      return;
    }

    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [notesQuery.error, router]);

  function replaceFilters(next: ClinicPatientNoteListFilters) {
    const query = buildSearchParams(next);
    router.replace(`${pathname}?${query.toString()}`);
  }

  function handleAddNote() {
    setEditingNote(null);
    setEditorOpen(true);
  }

  function handleEditNote(note: ClinicPatientNote) {
    setEditingNote(note);
    setEditorOpen(true);
  }

  const patientName = patientQuery.data?.patient
    ? getPatientDisplayName(patientQuery.data.patient)
    : "Patient";

  const notes = notesQuery.data?.data ?? [];
  const pagination = notesQuery.data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="patient.notes">
      <ListPage
        title={`Medical notes — ${patientName}`}
        subtitle="Clinical notes linked to this patient."
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="ghost">
              <Link href={`/clinic/patients/${params.id}`}>&larr; Back to patient</Link>
            </Button>
            <Button className="btn-primary" onClick={handleAddNote}>
              Add note
            </Button>
          </div>
        }
        isLoading={notesQuery.isLoading || patientQuery.isLoading}
        isError={notesQuery.isError}
        onRetry={() => void notesQuery.refetch()}
        loadingRows={5}
      >
        <PatientNotesList
          notes={notes}
          filters={filters}
          pagination={pagination}
          isBusy={notesQuery.isFetching}
          onFiltersChange={replaceFilters}
          onPageChange={(page) => replaceFilters({ ...filters, page })}
          onEditNote={handleEditNote}
        />

        <PatientNoteEditor
          patientId={params.id}
          open={editorOpen}
          note={editingNote}
          onOpenChange={setEditorOpen}
          onSaved={() => void notesQuery.refetch()}
        />
      </ListPage>
    </WithPermission>
  );
}
