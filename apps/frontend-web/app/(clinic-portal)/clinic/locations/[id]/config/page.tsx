"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { LocationConfigEditor } from "@/components/locations/LocationConfigEditor";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicLocation, useClinicLocationConfigNamespaces } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseLocationConfigErrors, parseLocationFetchErrors } from "@/lib/location-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicLocationConfigPageProps = {
  params: { id: string };
};

export default function ClinicLocationConfigPage({ params }: ClinicLocationConfigPageProps) {
  const router = useRouter();
  const locationQuery = useClinicLocation(params.id);
  const namespacesQuery = useClinicLocationConfigNamespaces(params.id);

  const isLoading = locationQuery.isLoading || namespacesQuery.isLoading;
  const loadError = locationQuery.error ?? namespacesQuery.error;

  useEffect(() => {
    if (isLoading || !loadError) {
      return;
    }

    const parsed =
      loadError === locationQuery.error
        ? parseLocationFetchErrors(loadError)
        : parseLocationConfigErrors(loadError);

    if ("forbidden" in parsed && (parsed.forbidden || parsed.tenantMismatch)) {
      router.replace("/forbidden");
      return;
    }

    if ("notFound" in parsed && parsed.notFound) {
      toast.error(parsed.message ?? parsed.generalError ?? "Location does not exist.");
      router.replace("/clinic/locations");
    }
  }, [isLoading, loadError, locationQuery.error, router]);

  useEffect(() => {
    if (!locationQuery.isLoading && !locationQuery.isError && !locationQuery.data) {
      toast.error("Location does not exist.");
      router.replace("/clinic/locations");
    }
  }, [locationQuery.data, locationQuery.isError, locationQuery.isLoading, router]);

  return (
    <WithPermission permission="location.manage">
      <PageHeader
        title={
          locationQuery.data?.name
            ? `Configuration — ${locationQuery.data.name}`
            : "Location configuration"
        }
        subtitle="Manage branding, operations, features, and integrations for this location."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/locations/${params.id}`}>&larr; Back to location</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {loadError && !isLoading && !(loadError instanceof ApiError) ? (
        <PageError
          onRetry={() => {
            void locationQuery.refetch();
            void namespacesQuery.refetch();
          }}
        />
      ) : null}
      {!isLoading && !loadError && locationQuery.data ? (
        <LocationConfigEditor
          locationId={params.id}
          locationName={locationQuery.data.name}
          onForbidden={() => router.replace("/forbidden")}
          onNotFound={() => {
            toast.error("Location does not exist.");
            router.replace("/clinic/locations");
          }}
        />
      ) : null}
    </WithPermission>
  );
}
