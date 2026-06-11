"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PharmacyPrescriptionDetail } from "@/components/pharmacy-portal/prescription-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyPrescription } from "@/hooks/usePharmacyPortal";

type PharmacyPrescriptionDetailPageProps = {
  params: { id: string };
};

export default function PharmacyPrescriptionDetailPage({
  params,
}: PharmacyPrescriptionDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePharmacyPrescription(params.id);

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/pharmacy/prescriptions">&larr; Back to prescriptions</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <PharmacyPrescriptionDetail prescription={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Prescription not found." /> : null}
    </>
  );
}
