"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { notesApi } from "@/lib/api";

export default function NotesPage() {
  const { data, isLoading } = useQuery({ queryKey: ["notes"], queryFn: () => notesApi.list() });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clinical Notes</h1>
          <p className="text-muted-foreground">SOAP notes and attachments</p>
        </div>
        <Button>Create SOAP note</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>New SOAP Note (draft)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Textarea placeholder="Subjective" />
          <Textarea placeholder="Objective" />
          <Textarea placeholder="Assessment" />
          <Textarea placeholder="Plan" />
          <Button variant="outline">Attach file (UI only)</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Recent Notes</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? "Loading..." : (
            <ul className="space-y-2 text-sm">
              {(Array.isArray(data?.data) ? data.data : []).map((note: { id: string; title?: string }) => (
                <li key={note.id}><Link className="text-primary underline" href={`/notes/${note.id}`}>{note.title ?? note.id}</Link></li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
