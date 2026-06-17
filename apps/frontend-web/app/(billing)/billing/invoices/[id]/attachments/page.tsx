import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default function LegacyBillingInvoiceAttachmentsRedirect({ params }: PageProps) {
  redirect(`/clinic/billing/${params.id}`);
}
