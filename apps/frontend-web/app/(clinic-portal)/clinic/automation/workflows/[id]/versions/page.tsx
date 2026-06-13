"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { WorkflowVersionActions } from "@/components/automation/WorkflowVersionActions";
import { WorkflowVersionDiff } from "@/components/automation/WorkflowVersionDiff";
import { WorkflowVersionList } from "@/components/automation/WorkflowVersionList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAutomationWorkflow,
  useRollbackWorkflowVersion,
  useUpdateWorkflowVersionLabel,
  useWorkflowVersionDiff,
  useWorkflowVersions,
} from "@/hooks/useAutomationPortal";
import { IfHasPermission, WithPermission } from "@/lib/auth/withPermission";

type WorkflowVersionsPageProps = {
  params: { id: string };
};

export default function WorkflowVersionsPage({ params }: WorkflowVersionsPageProps) {
  const router = useRouter();
  const workflowId = params.id;
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [compareFrom, setCompareFrom] = useState<number | null>(null);
  const [compareTo, setCompareTo] = useState<number | null>(null);

  const workflowQuery = useAutomationWorkflow(workflowId);
  const versionsQuery = useWorkflowVersions(workflowId);
  const diffQuery = useWorkflowVersionDiff(workflowId, compareFrom, compareTo);
  const rollback = useRollbackWorkflowVersion(workflowId);
  const updateLabel = useUpdateWorkflowVersionLabel(workflowId);

  const versions = versionsQuery.data ?? [];
  const selectedRecord = useMemo(
    () => versions.find((version) => version.versionNumber === selectedVersion) ?? null,
    [selectedVersion, versions],
  );

  function handleCompareVersion(versionNumber: number) {
    if (!compareFrom || compareFrom === versionNumber) {
      setCompareFrom(versionNumber);
      return;
    }
    setCompareTo(versionNumber);
  }

  async function handleRollback(versionNumber: number) {
    await rollback.mutateAsync(versionNumber);
    router.push(`/clinic/automation/workflows/${workflowId}/edit`);
  }

  return (
    <WithPermission permission="automation.view">
      <ListPage
        title={workflowQuery.data?.name ? `${workflowQuery.data.name} versions` : "Workflow versions"}
        subtitle="Browse version history, compare changes, and restore previous definitions."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/automation/workflows/${workflowId}/edit`}>&larr; Back to editor</Link>
          </Button>
        }
        isLoading={versionsQuery.isLoading || workflowQuery.isLoading}
        isError={versionsQuery.isError}
        onRetry={() => void versionsQuery.refetch()}
        loadingRows={5}
      >
        <WorkflowVersionActions
          versions={versions}
          compareFrom={compareFrom}
          compareTo={compareTo}
          onCompareFromChange={setCompareFrom}
          onCompareToChange={setCompareTo}
          onRollback={handleRollback}
          onUpdateLabel={async (versionNumber, label) => {
            await updateLabel.mutateAsync({ versionNumber, label });
          }}
          isRollingBack={rollback.isPending}
        />

        <WorkflowVersionDiff diff={diffQuery.data} isLoading={diffQuery.isFetching} />

        <WorkflowVersionList
          versions={versions}
          selectedVersion={selectedVersion}
          compareVersion={compareTo ?? compareFrom}
          onSelectVersion={setSelectedVersion}
          onCompareVersion={handleCompareVersion}
          renderActions={(version) => (
            <IfHasPermission permission="automation.versioning">
              <button
                type="button"
                className="dashboard-link"
                onClick={() => void handleRollback(version.versionNumber)}
              >
                Rollback
              </button>
            </IfHasPermission>
          )}
        />

        {selectedRecord ? (
          <Card>
            <CardHeader>
              <CardTitle>Version v{selectedRecord.versionNumber} definition</CardTitle>
            </CardHeader>
            <CardBody>
              <pre className="automation-json-preview">
                {JSON.stringify(selectedRecord.definition, null, 2)}
              </pre>
            </CardBody>
          </Card>
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
