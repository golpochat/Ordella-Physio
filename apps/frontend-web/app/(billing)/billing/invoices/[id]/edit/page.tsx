import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default function LegacyBillingInvoiceEditRedirect({ params }: PageProps) {
  redirect(`/clinic/billing/${params.id}`);
}
