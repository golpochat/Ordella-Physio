"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesEditor } from "@/components/therapist-portal/notes-editor";
import { useDeleteTherapistNote } from "@/hooks/useTherapistPortal";
import type { TherapistNote } from "@/lib/therapist-portal-types";
import { formatPortalDateTime } from "@/lib/therapist-portal-utils";

export function TherapistNoteDetailView({ note }: { note: TherapistNote }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const deleteNote = useDeleteTherapistNote();

  if (isEditing) {
    return <NotesEditor mode="edit" note={note} />;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Clinical note</CardTitle>
            <Badge>{note.type}</Badge>
          </div>
        </CardHeader>
        <CardBody className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Created</p>
            <p className="text-muted-foreground">{formatPortalDateTime(note.createdAt)}</p>
          </div>
          <div>
            <p className="font-medium">Patient</p>
            <p className="text-muted-foreground">{note.patientId}</p>
          </div>
          <div className="rounded-lg bg-muted/40 p-4">
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
        <Button
          variant="destructive"
          disabled={deleteNote.isPending}
          onClick={() => {
            if (!window.confirm("Delete this note?")) {
              return;
            }
            deleteNote.mutate(note.id, {
              onSuccess: () => {
                toast.success("Note deleted");
                router.push("/therapist/notes");
              },
              onError: () => toast.error("Failed to delete note"),
            });
          }}
        >
          Delete
        </Button>
        <Button asChild variant="outline">
          <Link href="/therapist/notes">Back to notes</Link>
        </Button>
      </div>
    </div>
  );
}
