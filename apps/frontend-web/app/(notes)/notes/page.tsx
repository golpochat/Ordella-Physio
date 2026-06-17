import { redirect } from "next/navigation";

export default function LegacyNotesRedirect() {
  redirect("/clinic/notes");
}
