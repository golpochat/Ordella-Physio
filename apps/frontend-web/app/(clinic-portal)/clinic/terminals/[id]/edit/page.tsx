"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TerminalEditForm } from "@/components/terminals/TerminalEditForm";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicTerminal } from "@/hooks/useTerminalPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseTerminalFetchErrors } from "@/lib/terminal-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicTerminalEditPageProps = {
  params: { id: string };
};

export default function ClinicTerminalEditPage({ params }: ClinicTerminalEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicTerminal(params.id);

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
        title={data?.name ? `Edit ${data.name}` : "Edit terminal"}
        subtitle="Update terminal details, location assignment, and status."
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
      {!isLoading && !isError && data ? <TerminalEditForm terminal={data} /> : null}
    </WithPermission>
  );
}
