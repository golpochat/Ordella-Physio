"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PharmacyPrescriptionForm } from "@/components/pharmacy-portal/prescription-form";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyPrescription } from "@/hooks/usePharmacyPortal";

type PharmacyEditPrescriptionPageProps = {
  params: { id: string };
};

export default function PharmacyEditPrescriptionPage({ params }: PharmacyEditPrescriptionPageProps) {
  const { data, isLoading, isError, refetch } = usePharmacyPrescription(params.id);

  if (isLoading) return <PageLoading rows={4} />;
  if (isError) return <PageError onRetry={() => void refetch()} />;
  if (!data) return <PageError message="Prescription not found." />;
  if (data.status !== "DRAFT") {
    return (
      <div className="space-y-4">
        <PageError message="Only draft prescriptions can be edited." />
        <Button asChild variant="outline">
          <Link href={`/pharmacy/prescriptions/${params.id}`}>Back to prescription</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost">
        <Link href={`/pharmacy/prescriptions/${params.id}`}>&larr; Back</Link>
      </Button>
      <PharmacyPrescriptionForm mode="edit" prescription={data} />
    </div>
  );
}
