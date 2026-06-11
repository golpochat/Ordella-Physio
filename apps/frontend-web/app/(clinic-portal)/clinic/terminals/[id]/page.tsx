"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TerminalDetail } from "@/components/terminals/TerminalDetail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicLocation } from "@/hooks/useClinicPortal";
import { useClinicTerminal } from "@/hooks/useTerminalPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseTerminalFetchErrors } from "@/lib/terminal-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicTerminalDetailPageProps = {
  params: { id: string };
};

export default function ClinicTerminalDetailPage({ params }: ClinicTerminalDetailPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicTerminal(params.id);
  const locationQuery = useClinicLocation(data?.locationId ?? "");

  useEffect(() => {
    if (isLoading || !isError) {
      return;
    }

    const parsed = parseTerminalFetchErrors(error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.notFound) {
      toast.error(parsed.message ?? "Terminal does not exist.");
      router.replace("/clinic/terminals");
    }
  }, [error, isError, isLoading, router]);

  return (
    <WithPermission permission="terminal.manage">
      <PageHeader
        title={data?.name ?? "Terminal details"}
        subtitle="View terminal details and manage status."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/terminals">&larr; Back to terminals</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && data ? (
        <TerminalDetail terminal={data} locationName={locationQuery.data?.name} />
      ) : null}
    </WithPermission>
  );
}
