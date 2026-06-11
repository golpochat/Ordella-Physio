"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { LocationEditForm } from "@/components/locations/LocationEditForm";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicLocation } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseLocationFetchErrors } from "@/lib/location-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicLocationEditPageProps = {
  params: { id: string };
};

export default function ClinicLocationEditPage({ params }: ClinicLocationEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicLocation(params.id);

  useEffect(() => {
    if (isLoading || !isError) {
      return;
    }

    const parsed = parseLocationFetchErrors(error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.notFound) {
      toast.error(parsed.message ?? "Location does not exist.");
      router.replace("/clinic/locations");
    }
  }, [error, isError, isLoading, router]);

  return (
    <WithPermission permission="location.manage">
      <PageHeader
        title={data?.name ? `Edit ${data.name}` : "Edit location"}
        subtitle="Update clinic location details and status."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/locations">&larr; Back to locations</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && data ? <LocationEditForm location={data} /> : null}
    </WithPermission>
  );
}
