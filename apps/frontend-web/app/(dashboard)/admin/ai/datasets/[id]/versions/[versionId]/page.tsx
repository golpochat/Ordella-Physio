"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AiAdminShell, DatasetRecordTable } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useAddDatasetRecord,
  useBatchEmbedDatasetVersion,
  useBulkAddDatasetRecords,
  useDataset,
  useDatasetRecords,
  useDatasetVersions,
  useDeleteDatasetRecord,
  useUpdateDatasetRecord,
} from "@/hooks/useDatasetPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { IfHasPermission, WithPermission } from "@/lib/auth/withPermission";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";

type Props = { params: { id: string; versionId: string } };

export default function AdminDatasetVersionPage({ params }: Props) {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.dataset.manage");
  const { id: datasetId, versionId } = params;
  const datasetQuery = useDataset(datasetId);
  const versionsQuery = useDatasetVersions(datasetId);
  const recordsQuery = useDatasetRecords(datasetId, versionId);
  const addRecord = useAddDatasetRecord(datasetId, versionId);
  const bulkAdd = useBulkAddDatasetRecords(datasetId, versionId);
  const updateRecord = useUpdateDatasetRecord(datasetId, versionId);
  const deleteRecord = useDeleteDatasetRecord(datasetId, versionId);
  const batchEmbed = useBatchEmbedDatasetVersion(datasetId, versionId);
  const [bulkJson, setBulkJson] = useState("");
  const version = versionsQuery.data?.find((entry) => entry.id === versionId);

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title={datasetQuery.data ? `${datasetQuery.data.name} · v${version?.versionNumber ?? "?"}` : "Version"}
          subtitle="Records, bulk import, embeddings, and labeling."
          action={
            <Button asChild variant="ghost"><Link href={adminAiPaths.dataset(datasetId)}>&larr; Dataset</Link></Button>
          }
          isLoading={recordsQuery.isLoading}
          isError={recordsQuery.isError}
          onRetry={() => void recordsQuery.refetch()}
          loadingRows={5}
        >
          <IfHasPermission permission="ai.dataset.manage">
            <div className="dataset-create-dialog">
              <textarea className="automation-select" value={bulkJson} onChange={(e) => setBulkJson(e.target.value)} rows={5} placeholder='[{"input":"..."}]' />
              <Button type="button" variant="secondary" disabled={!bulkJson.trim() || bulkAdd.isPending} onClick={() => {
                try {
                  const parsed = JSON.parse(bulkJson);
                  const records = Array.isArray(parsed) ? parsed : parsed.records;
                  if (!Array.isArray(records) || !records.length) throw new Error("Provide a JSON array of records.");
                  void bulkAdd.mutateAsync(records).then((r) => toast.success(`Imported ${r.added}`));
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Invalid JSON.");
                }
              }}>
                Bulk import
              </Button>
              <Button type="button" onClick={() => void batchEmbed.mutateAsync(undefined).then((r) => toast.success(`Embedded ${r.embedded}`))}>
                Generate embeddings
              </Button>
            </div>
          </IfHasPermission>
          <DatasetRecordTable
            records={recordsQuery.data ?? []}
            canManage={canManage}
            isBusy={recordsQuery.isFetching}
            onAdd={(p) => void addRecord.mutateAsync({ input: p.input, output: p.output || undefined })}
            onUpdate={(id, p) => void updateRecord.mutateAsync({ recordId: id, input: p.input, output: p.output || undefined })}
            onDelete={(id) => void deleteRecord.mutateAsync(id)}
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
