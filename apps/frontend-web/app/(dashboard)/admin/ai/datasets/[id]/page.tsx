"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AiAdminShell, DatasetVersionTable } from "@/components/ai/admin";
import { DatasetDiffViewer } from "@/components/ai/datasets/DatasetDiffViewer";
import { DatasetEditor } from "@/components/ai/datasets/DatasetEditor";
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
import { ADMIN_AI_BASE, adminAiPaths } from "@/lib/ai-admin-paths";
import { IfHasPermission, WithPermission } from "@/lib/auth/withPermission";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";

type Props = { params: { id: string } };

export default function AdminDatasetDetailPage({ params }: Props) {
  const datasetId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.dataset.manage");
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
    () => versions.find((v) => v.versionNumber === datasetQuery.data?.latestVersionNumber) ?? versions[0],
    [datasetQuery.data?.latestVersionNumber, versions],
  );

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title={datasetQuery.data?.name ?? "Dataset"}
          subtitle="Edit metadata, manage versions, and export training data."
          action={
            <div className="automation-builder-actions">
              <Button asChild variant="ghost"><Link href={adminAiPaths.datasets}>&larr; Datasets</Link></Button>
              {latestVersion ? (
                <Button asChild variant="ghost">
                  <Link href={adminAiPaths.datasetVersion(datasetId, latestVersion.id)}>Latest records</Link>
                </Button>
              ) : null}
              <IfHasPermission permission="ai.dataset.manage">
                <Button type="button" variant="secondary" onClick={() => void exportDataset.mutateAsync().then(() => toast.success("Exported."))}>
                  Export
                </Button>
                <Button type="button" onClick={() => void createVersion.mutateAsync().then(() => toast.success("Version created."))}>
                  New version
                </Button>
              </IfHasPermission>
            </div>
          }
          isLoading={datasetQuery.isLoading}
          isError={datasetQuery.isError}
          onRetry={() => { void datasetQuery.refetch(); void versionsQuery.refetch(); }}
          loadingRows={4}
        >
          {datasetQuery.data && canManage ? (
            <DatasetEditor dataset={datasetQuery.data} isSaving={updateDataset.isPending} onSave={(p) => void updateDataset.mutateAsync(p)} />
          ) : null}
          <DatasetDiffViewer diff={diffQuery.data} isLoading={diffQuery.isFetching} />
          <DatasetVersionTable
            datasetId={datasetId}
            versions={versions}
            compareFrom={compareFrom}
            compareTo={compareTo}
            basePath={ADMIN_AI_BASE}
            canManage={canManage}
            onCompareVersion={(n) => { if (!compareFrom || compareFrom === n) setCompareFrom(n); else setCompareTo(n); }}
            onRollback={(n) => void rollbackVersion.mutateAsync(n)}
          />
          {datasetQuery.data?.auditLogs?.length ? (
            <Card><CardHeader><CardTitle>Audit log</CardTitle></CardHeader><CardBody>
              <ul className="dataset-version-diff-list">
                {datasetQuery.data.auditLogs.map((log) => (
                  <li key={log.id}><strong>{log.action}</strong></li>
                ))}
              </ul>
            </CardBody></Card>
          ) : null}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
