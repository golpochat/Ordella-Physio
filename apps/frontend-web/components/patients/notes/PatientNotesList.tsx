"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  CLINIC_PATIENT_NOTE_TYPES,
  type ClinicPatientNote,
  type ClinicPatientNoteListFilters,
  type ClinicPatientNoteType,
} from "@/lib/clinic-portal-types";

const NOTE_TYPE_LABELS: Record<ClinicPatientNoteType, string> = {
  GENERAL: "General",
  DIAGNOSIS: "Diagnosis",
  TREATMENT: "Treatment",
  FOLLOW_UP: "Follow-up",
  PHYSIOTHERAPY: "Physiotherapy",
  NURSING: "Nursing",
};

function formatCreatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatStaffLabel(staffId: string): string {
  if (staffId.length <= 10) {
    return staffId;
  }

  return `…${staffId.slice(-8)}`;
}

export type PatientNotesListProps = {
  notes: ClinicPatientNote[];
  filters: ClinicPatientNoteListFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isBusy?: boolean;
  onFiltersChange: (filters: ClinicPatientNoteListFilters) => void;
  onPageChange: (page: number) => void;
  onEditNote: (note: ClinicPatientNote) => void;
};

export function PatientNotesList({
  notes,
  filters,
  pagination,
  isBusy = false,
  onFiltersChange,
  onPageChange,
  onEditNote,
}: PatientNotesListProps) {
  const [viewNote, setViewNote] = useState<ClinicPatientNote | null>(null);
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleNoteTypeChange(value: string) {
    onFiltersChange({
      ...filters,
      page: 1,
      noteType: value ? (value as ClinicPatientNoteType) : undefined,
    });
  }

  function handleStaffIdChange(value: string) {
    onFiltersChange({
      ...filters,
      page: 1,
      staffId: value.trim() || undefined,
    });
  }

  function handleCreatedFromChange(value: string) {
    onFiltersChange({
      ...filters,
      page: 1,
      createdFrom: value || undefined,
    });
  }

  function handleCreatedToChange(value: string) {
    onFiltersChange({
      ...filters,
      page: 1,
      createdTo: value || undefined,
    });
  }

  function handleReset() {
    onFiltersChange({ page: 1, limit: filters.limit ?? 20 });
  }

  return (
    <div className="space-y-4">
      <section className="user-list-filters">
        <div className="user-list-filters-grid">
          <div className="user-list-filter-field">
            <Label htmlFor="patient-notes-type-filter">Note type</Label>
            <select
              id="patient-notes-type-filter"
              className="tenant-create-form-select"
              value={filters.noteType ?? ""}
              disabled={isBusy}
              onChange={(event) => handleNoteTypeChange(event.target.value)}
            >
              <option value="">All types</option>
              {CLINIC_PATIENT_NOTE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {NOTE_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </div>

          <div className="user-list-filter-field">
            <Label htmlFor="patient-notes-staff-filter">Staff ID</Label>
            <Input
              id="patient-notes-staff-filter"
              value={filters.staffId ?? ""}
              placeholder="Filter by author ID"
              disabled={isBusy}
              onChange={(event) => handleStaffIdChange(event.target.value)}
            />
          </div>

          <div className="user-list-filter-field">
            <Label htmlFor="patient-notes-from">Created from</Label>
            <Input
              id="patient-notes-from"
              type="date"
              value={filters.createdFrom ?? ""}
              disabled={isBusy}
              onChange={(event) => handleCreatedFromChange(event.target.value)}
            />
          </div>

          <div className="user-list-filter-field">
            <Label htmlFor="patient-notes-to">Created to</Label>
            <Input
              id="patient-notes-to"
              type="date"
              value={filters.createdTo ?? ""}
              disabled={isBusy}
              onChange={(event) => handleCreatedToChange(event.target.value)}
            />
          </div>
        </div>

        <div className="user-list-filters-actions">
          <Button type="button" variant="ghost" disabled={isBusy} onClick={handleReset}>
            Reset filters
          </Button>
        </div>
      </section>

      <div className="user-list-table">
        <DataTable
          columns={["Title", "Note Type", "Staff", "Created At", "Actions"]}
          grid="patientNotesTable"
          emptyMessage="No notes found."
          isEmpty={notes.length === 0}
        >
          {notes.map((note) => (
            <Row key={note.id}>
              <div className="dashboard-cell-primary">{note.title}</div>
              <div className="dashboard-cell-muted">{NOTE_TYPE_LABELS[note.noteType]}</div>
              <div className="dashboard-cell-muted">{formatStaffLabel(note.staffId)}</div>
              <div className="dashboard-cell-muted">{formatCreatedAt(note.createdAt)}</div>
              <div className="user-list-actions">
                <button
                  type="button"
                  className="dashboard-link"
                  onClick={() => setViewNote(note)}
                >
                  View
                </button>
                <button type="button" className="dashboard-link" onClick={() => onEditNote(note)}>
                  Edit
                </button>
              </div>
            </Row>
          ))}
        </DataTable>

        <nav className="user-list-pagination" aria-label="Patient notes pagination">
          <p className="user-list-pagination-summary">
            Page {currentPage} of {totalPages} · {pagination.total} notes
          </p>
          <div className="user-list-pagination-actions">
            <Button
              type="button"
              variant="outline"
              disabled={isBusy || currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isBusy || currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </nav>
      </div>

      <Modal open={Boolean(viewNote)} onOpenChange={(open) => !open && setViewNote(null)}>
        <ModalContent className="max-w-2xl">
          {viewNote ? (
            <>
              <ModalHeader>
                <ModalTitle>{viewNote.title}</ModalTitle>
                <ModalDescription>
                  {NOTE_TYPE_LABELS[viewNote.noteType]} · {formatCreatedAt(viewNote.createdAt)}
                </ModalDescription>
              </ModalHeader>
              <div className="whitespace-pre-wrap text-sm text-muted-foreground">{viewNote.content}</div>
              <ModalFooter>
                <Button variant="outline" onClick={() => setViewNote(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setViewNote(null);
                    onEditNote(viewNote);
                  }}
                >
                  Edit
                </Button>
              </ModalFooter>
            </>
          ) : null}
        </ModalContent>
      </Modal>
    </div>
  );
}
