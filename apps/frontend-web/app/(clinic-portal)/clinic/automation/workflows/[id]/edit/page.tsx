"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { WorkflowBuilder } from "@/components/automation/WorkflowBuilder";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { Button } from "@/components/ui/button";
import { useAutomationWorkflow } from "@/hooks/useAutomationPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { ApiError } from "@/lib/api-client";
import type { WorkflowDraft } from "@/lib/automation-types";

type ClinicAutomationWorkflowEditPageProps = {
  params: { id: string };
};

export default function ClinicAutomationWorkflowEditPage({ params }: ClinicAutomationWorkflowEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useAutomationWorkflow(params.id);

  const initialDraft = useMemo<WorkflowDraft | undefined>(() => {
    if (!data) {
      return undefined;
    }

    return {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      dryRun: data.dryRun,
      trigger: data.trigger,
      conditions: data.conditions,
      actions: data.actions,
    };
  }, [data]);

  useEffect(() => {
    if (isLoading || !isError) {
      return;
    }

    if (error instanceof ApiError && error.status === 404) {
      toast.error("Workflow not found.");
      router.replace("/clinic/automation/workflows");
    }
  }, [error, isError, isLoading, router]);

  return (
    <WithPermission permission="automation.manage">
      <PageHeader
        title={data?.name ? `Edit ${data.name}` : "Edit workflow"}
        subtitle="Update triggers, conditions, actions, and preview the workflow graph."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href={`/clinic/automation/workflows/${params.id}/versions`}>Version history</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/clinic/automation/workflows">&larr; Back to workflows</Link>
            </Button>
          </div>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError && !(error instanceof ApiError) ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && initialDraft ? (
        <WorkflowBuilder mode="edit" workflowId={params.id} initialDraft={initialDraft} />
      ) : null}
    </WithPermission>
  );
}
