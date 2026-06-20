"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PharmacyPrescriptionDetail } from "@/components/pharmacy-portal/prescription-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useIssuePharmacyPrescription, usePharmacyPrescription } from "@/hooks/usePharmacyPortal";

type PharmacyPrescriptionDetailPageProps = {
  params: { id: string };
};

export default function PharmacyPrescriptionDetailPage({
  params,
}: PharmacyPrescriptionDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePharmacyPrescription(params.id);
  const issueMutation = useIssuePharmacyPrescription();

  async function handleIssue() {
    try {
      await issueMutation.mutateAsync(params.id);
      toast.success("Prescription issued");
      void refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to issue prescription");
    }
  }

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/pharmacy/prescriptions">&larr; Back to prescriptions</Link>
      </Button>

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? (
        <PharmacyPrescriptionDetail
          prescription={data}
          onIssue={() => void handleIssue()}
          isIssuing={issueMutation.isPending}
        />
      ) : null}
      {!isLoading && !isError && !data ? <PageError message="Prescription not found." /> : null}
    </>
  );
}
