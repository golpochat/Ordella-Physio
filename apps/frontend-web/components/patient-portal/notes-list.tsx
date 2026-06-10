"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PatientNote } from "@/lib/patient-portal-types";
import { formatPatientDate } from "@/lib/patient-portal-utils";

export function NotesList({ notes }: { notes: PatientNote[] }) {
  if (!notes.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No shared notes</p>
        <p className="mt-2">Care notes shared by your therapist will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{note.type}</Badge>
                <span className="text-xs text-muted-foreground">
                  {formatPatientDate(note.createdAt)}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{note.content}</p>
            </div>
            <Link
              href={`/patient/notes/${note.id}`}
              className="shrink-0 text-sm font-medium text-primary hover:underline"
            >
              Read note
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
