import { redirect } from "next/navigation";

export default function LegacyBillingInvoicesRedirect() {
  redirect("/clinic/billing/invoices");
}
