import { redirect } from "next/navigation";

export default function PatientPortalHomePage() {
  redirect("/patient/profile");
}
