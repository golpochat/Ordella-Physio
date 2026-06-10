import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortalUserNote } from "@/lib/user-portal-types";
import { formatPortalDateTime } from "@/lib/user-portal-utils";

export function UserNoteDetailView({ note }: { note: PortalUserNote }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Note</CardTitle>
            <Badge>{note.type}</Badge>
          </div>
        </CardHeader>
        <CardBody className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Created</p>
            <p className="text-muted-foreground">{formatPortalDateTime(note.createdAt)}</p>
          </div>
          <div className="rounded-lg bg-muted/40 p-4">
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
          <p className="text-xs text-muted-foreground">Read-only</p>
        </CardBody>
      </Card>
      <Button asChild variant="outline">
        <Link href="/user/notes">Back to notes</Link>
      </Button>
    </div>
  );
}
