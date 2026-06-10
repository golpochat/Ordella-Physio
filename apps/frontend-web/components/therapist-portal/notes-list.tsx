"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import type { TherapistNote } from "@/lib/therapist-portal-types";
import { formatPortalDate } from "@/lib/therapist-portal-utils";

export function TherapistNotesList({ notes }: { notes: TherapistNote[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/therapist/notes/create">Create note</Link>
        </Button>
      </div>

      {!notes.length ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">No clinical notes yet</p>
          <p className="mt-2">Create your first note for a patient session.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{note.type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatPortalDate(note.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{note.content}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Patient: {note.patientId}</p>
                </div>
                <Link
                  href={`/therapist/notes/${note.id}`}
                  className="shrink-0 text-sm font-medium text-primary hover:underline"
                >
                  Open
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
