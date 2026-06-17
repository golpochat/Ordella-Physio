import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default function LegacyNoteDetailRedirect({ params }: PageProps) {
  redirect(`/clinic/notes/${params.id}`);
}
