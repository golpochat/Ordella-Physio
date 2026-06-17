import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default function LegacyAppointmentDetailRedirect({ params }: PageProps) {
  redirect(`/clinic/appointments/${params.id}`);
}
