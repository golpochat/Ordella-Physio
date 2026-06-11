import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotesEditor } from "@/components/therapist-portal/notes-editor";

export default function TherapistCreateNotePage() {
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/therapist/notes">&larr; Back to notes</Link>
      </Button>
      <NotesEditor mode="create" />
    </>
  );
}
