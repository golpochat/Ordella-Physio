import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Clinical Notes</h1>
        <p className="text-muted-foreground">Scaffold notes list with read-only patient visibility.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent notes</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardBody>
      </Card>
    </div>
  );
}
