"use client";

import Link from "next/link";
import { toast } from "sonner";
import { WorkflowList } from "@/components/automation/WorkflowList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useAutomationWorkflows, useToggleAutomationWorkflow } from "@/hooks/useAutomationPortal";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicAutomationWorkflowsPage() {
  const { data, isLoading, isError, isFetching, refetch } = useAutomationWorkflows();
  const toggleWorkflow = useToggleAutomationWorkflow();

  async function handleToggleActive(id: string, isActive: boolean) {
    try {
      await toggleWorkflow.mutateAsync({ id, isActive });
      toast.success(isActive ? "Workflow enabled." : "Workflow disabled.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update workflow status.";
      toast.error(message);
    }
  }

  return (
    <WithPermission permission="automation.manage">
      <ListPage
        title="AI Automation Workflows"
        subtitle="Configure triggers, conditions, and actions for tenant-level AI automations."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href="/clinic/automation/monitor">Live monitor</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/clinic/automation/workflows/history">View history</Link>
            </Button>
            <Button asChild>
              <Link href="/clinic/automation/workflows/new">Create workflow</Link>
            </Button>
          </div>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={5}
      >
        <WorkflowList
          workflows={data ?? []}
          isBusy={isFetching || toggleWorkflow.isPending}
          onToggleActive={(id, isActive) => void handleToggleActive(id, isActive)}
        />
      </ListPage>
    </WithPermission>
  );
}
