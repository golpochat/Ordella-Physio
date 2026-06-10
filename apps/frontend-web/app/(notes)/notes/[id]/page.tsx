import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

type NoteDetailPageProps = {
  params: { id: string };
};

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Note {params.id}</h1>
        <p className="text-muted-foreground">Clinical note detail scaffold.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Note content</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">Load via /api/notes/{params.id}.</p>
        </CardBody>
      </Card>
    </div>
  );
}
