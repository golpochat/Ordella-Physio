import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default function LegacyPatientDetailRedirect({ params }: PageProps) {
  redirect(`/clinic/patients/${params.id}`);
}
