"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PortalUserNote } from "@/lib/user-portal-types";
import { formatPortalDate } from "@/lib/user-portal-utils";

export function UserNotesList({ notes }: { notes: PortalUserNote[] }) {
  if (!notes.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No notes available</p>
        <p className="mt-2">Clinical notes shared with you will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Read-only view of your notes.</p>
      {notes.map((note) => (
        <Card key={note.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{note.type}</Badge>
                <span className="text-xs text-muted-foreground">{formatPortalDate(note.createdAt)}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{note.content}</p>
            </div>
            <Link
              href={`/user/notes/${note.id}`}
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
