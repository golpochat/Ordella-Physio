import { redirect } from "next/navigation";

export default function OrganizationBillingUpgradePage() {
  redirect("/checkout?intent=checkout");
}
