import { redirect } from "next/navigation";

export default function LegacyBillingInvoiceNewRedirect() {
  redirect("/clinic/billing/invoices");
}
