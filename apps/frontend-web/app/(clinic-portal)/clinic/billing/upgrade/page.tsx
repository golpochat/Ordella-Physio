import { redirect } from "next/navigation";

export default function ClinicBillingUpgradePage() {
  redirect("/checkout?intent=checkout");
}
