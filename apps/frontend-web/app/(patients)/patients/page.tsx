import { redirect } from "next/navigation";

export default function LegacyPatientsRedirect() {
  redirect("/clinic/patients");
}
