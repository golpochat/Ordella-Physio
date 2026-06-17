import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default function LegacyBillingInvoiceAuditRedirect({ params }: PageProps) {
  redirect(`/clinic/billing/${params.id}`);
}
