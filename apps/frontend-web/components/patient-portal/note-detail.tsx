import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { PatientNote } from "@/lib/patient-portal-types";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";

export function NoteDetail({ note }: { note: PatientNote }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>Clinical note</CardTitle>
          <Badge>{note.type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Read-only view</p>
      </CardHeader>
      <CardBody className="space-y-4 text-sm">
        <div>
          <p className="font-medium">Created</p>
          <p className="text-muted-foreground">{formatPatientDateTime(note.createdAt)}</p>
        </div>
        <div>
          <p className="font-medium">Therapist</p>
          <p className="text-muted-foreground">{note.therapistId}</p>
        </div>
        <div className="rounded-lg bg-muted/40 p-4">
          <p className="whitespace-pre-wrap">{note.content}</p>
        </div>
      </CardBody>
    </Card>
  );
}
