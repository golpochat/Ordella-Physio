import { redirect } from "next/navigation";

export default function ClinicPatientCreateRedirectPage() {
  redirect("/clinic/patients/new");
}
