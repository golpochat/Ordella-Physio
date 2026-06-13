"use client";

import Link from "next/link";
import { WorkflowBuilder } from "@/components/automation/WorkflowBuilder";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicAutomationWorkflowCreatePage() {
  return (
    <WithPermission permission="automation.manage">
      <PageHeader
        title="Create workflow"
        subtitle="Build a new AI automation workflow from scratch or a template."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/automation/workflows">&larr; Back to workflows</Link>
          </Button>
        }
      />
      <WorkflowBuilder mode="create" />
    </WithPermission>
  );
}
