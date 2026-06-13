"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DatasetDiffViewer } from "@/components/ai/datasets/DatasetDiffViewer";
import { DatasetEditor } from "@/components/ai/datasets/DatasetEditor";
import { DatasetVersionList } from "@/components/ai/datasets/DatasetVersionList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCreateDatasetVersion,
  useDataset,
  useDatasetVersionDiff,
  useDatasetVersions,
  useExportDataset,
  useRollbackDatasetVersion,
  useUpdateDataset,
} from "@/hooks/useDatasetPortal";
import { IfHasPermission, WithPermission } from "@/lib/auth/withPermission";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";

type DatasetDetailPageProps = {
  params: { id: string };
};

export default function DatasetDetailPage({ params }: DatasetDetailPageProps) {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.dataset.manage");
  const datasetId = params.id;
  const datasetQuery = useDataset(datasetId);
  const versionsQuery = useDatasetVersions(datasetId);
  const updateDataset = useUpdateDataset(datasetId);
  const createVersion = useCreateDatasetVersion(datasetId);
  const rollbackVersion = useRollbackDatasetVersion(datasetId);
  const exportDataset = useExportDataset(datasetId);

  const [compareFrom, setCompareFrom] = useState<number | null>(null);
  const [compareTo, setCompareTo] = useState<number | null>(null);

  const diffQuery = useDatasetVersionDiff(datasetId, compareFrom, compareTo);
  const versions = versionsQuery.data ?? [];
  const latestVersion = useMemo(
    () => versions.find((version) => version.versionNumber === datasetQuery.data?.latestVersionNumber) ?? versions[0],
    [datasetQuery.data?.latestVersionNumber, versions],
  );

  function handleCompareVersion(versionNumber: number) {
    if (!compareFrom || compareFrom === versionNumber) {
      setCompareFrom(versionNumber);
      return;
    }
    setCompareTo(versionNumber);
  }

  async function handleSave(payload: { name: string; description: string; tags: string[] }) {
    try {
      await updateDataset.mutateAsync(payload);
      toast.success("Dataset updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update dataset.");
    }
  }

  async function handleCreateVersion() {
    try {
      await createVersion.mutateAsync();
      toast.success("New version created.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create version.");
    }
  }

  async function handleRollback(versionNumber: number) {
    try {
      await rollbackVersion.mutateAsync(versionNumber);
      toast.success(`Rolled back to v${versionNumber}.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to rollback version.");
    }
  }

  async function handleExport() {
    try {
      const payload = await exportDataset.mutateAsync();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${payload.dataset.name.replace(/\s+/g, "-").toLowerCase()}-export.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      toast.success("Dataset exported.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to export dataset.");
    }
  }

  return (
    <WithPermission permission="ai.dataset.view">
      <ListPage
        title={datasetQuery.data?.name ?? "Dataset"}
        subtitle="Edit metadata, manage versions, and export training data."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href="/clinic/ai/datasets">&larr; All datasets</Link>
            </Button>
            {latestVersion ? (
              <Button asChild variant="ghost">
                <Link href={`/clinic/ai/datasets/${datasetId}/versions/${latestVersion.id}`}>
                  Latest records
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/datasets/${datasetId}/label`}>Label data</Link>
            </Button>
            <IfHasPermission permission="ai.dataset.manage">
              <Button type="button" variant="secondary" onClick={() => void handleExport()}>
                Export
              </Button>
              <Button
                type="button"
                disabled={createVersion.isPending}
                onClick={() => void handleCreateVersion()}
              >
                New version
              </Button>
            </IfHasPermission>
          </div>
        }
        isLoading={datasetQuery.isLoading || versionsQuery.isLoading}
        isError={datasetQuery.isError}
        onRetry={() => {
          void datasetQuery.refetch();
          void versionsQuery.refetch();
        }}
        loadingRows={4}
      >
        {datasetQuery.data ? (
          <IfHasPermission permission="ai.dataset.manage">
            <DatasetEditor
              dataset={datasetQuery.data}
              isSaving={updateDataset.isPending}
              onSave={(payload) => void handleSave(payload)}
            />
          </IfHasPermission>
        ) : null}

        <DatasetDiffViewer diff={diffQuery.data} isLoading={diffQuery.isFetching} />

        <DatasetVersionList
          datasetId={datasetId}
          versions={versions}
          compareFrom={compareFrom}
          compareTo={compareTo}
          onCompareVersion={handleCompareVersion}
          onRollback={(versionNumber) => void handleRollback(versionNumber)}
          canManage={canManage}
        />

        {datasetQuery.data?.auditLogs?.length ? (
          <Card>
            <CardHeader>
              <CardTitle>Audit log</CardTitle>
            </CardHeader>
            <CardBody>
              <ul className="dataset-version-diff-list">
                {datasetQuery.data.auditLogs.map((log) => (
                  <li key={log.id}>
                    <strong>{log.action}</strong>
                    <span className="dashboard-cell-muted"> · {new Date(log.createdAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
