import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { StaffNote } from "@/lib/staff-portal-types";
import { formatPortalDateTime } from "@/lib/staff-portal-utils";

export function StaffNoteDetailView({ note }: { note: StaffNote }) {
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
          <div>
            <p className="font-medium">Therapist</p>
            <p className="text-muted-foreground">{note.therapistId}</p>
          </div>
          <div className="rounded-lg bg-muted/40 p-4">
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
          <p className="text-xs text-muted-foreground">Read-only staff view</p>
        </CardBody>
      </Card>
      <Button asChild variant="outline">
        <Link href="/staff/notes">Back to notes</Link>
      </Button>
    </div>
  );
}
