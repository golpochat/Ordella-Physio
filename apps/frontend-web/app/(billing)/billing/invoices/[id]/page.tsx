import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default function LegacyBillingInvoiceDetailRedirect({ params }: PageProps) {
  redirect(`/clinic/billing/${params.id}`);
}
