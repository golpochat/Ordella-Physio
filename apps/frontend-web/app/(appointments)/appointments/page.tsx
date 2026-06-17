import { redirect } from "next/navigation";

export default function LegacyAppointmentsRedirect() {
  redirect("/clinic/appointments");
}
