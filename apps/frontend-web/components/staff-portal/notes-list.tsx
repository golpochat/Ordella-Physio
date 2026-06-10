"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { StaffNote } from "@/lib/staff-portal-types";
import { formatPortalDate } from "@/lib/staff-portal-utils";

export function StaffNotesList({ notes }: { notes: StaffNote[] }) {
  if (!notes.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No clinical notes</p>
        <p className="mt-2">Therapist notes will appear here for reference.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Read-only — notes are authored by therapists.</p>
      {notes.map((note) => (
        <Card key={note.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{note.type}</Badge>
                <span className="text-xs text-muted-foreground">{formatPortalDate(note.createdAt)}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{note.content}</p>
              <p className="mt-1 text-xs text-muted-foreground">Patient: {note.patientId}</p>
            </div>
            <Link
              href={`/staff/notes/${note.id}`}
              className="shrink-0 text-sm font-medium text-primary hover:underline"
            >
              View
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
