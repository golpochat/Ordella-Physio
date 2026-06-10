"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Note {params.id}</h1>
        <Button asChild variant="outline"><Link href="/notes">Back</Link></Button>
      </div>
      <Card>
        <CardHeader><CardTitle>SOAP Note</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
          <section><h3 className="font-medium">Subjective</h3><p className="text-muted-foreground">Patient reports...</p></section>
          <section><h3 className="font-medium">Objective</h3><p className="text-muted-foreground">Exam findings...</p></section>
          <section><h3 className="font-medium">Assessment</h3><p className="text-muted-foreground">Clinical assessment...</p></section>
          <section><h3 className="font-medium">Plan</h3><p className="text-muted-foreground">Treatment plan...</p></section>
          <section><h3 className="font-medium">Attachments</h3><p className="text-muted-foreground">No attachments uploaded.</p></section>
        </CardContent>
      </Card>
    </div>
  );
}
