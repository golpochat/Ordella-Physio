"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { DatasetRecordTable } from "@/components/ai/datasets/DatasetRecordTable";
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
import { IfHasPermission, WithPermission } from "@/lib/auth/withPermission";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";

type DatasetVersionPageProps = {
  params: { id: string; versionId: string };
};

export default function DatasetVersionPage({ params }: DatasetVersionPageProps) {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.dataset.manage");
  const datasetId = params.id;
  const versionId = params.versionId;
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

  function parseRecordPayload(input: string, output: string) {
    function parseField(value: string): unknown {
      const trimmed = value.trim();
      if (!trimmed) {
        return null;
      }
      try {
        return JSON.parse(trimmed) as unknown;
      } catch {
        return trimmed;
      }
    }

    return {
      input: parseField(input),
      output: output.trim() ? parseField(output) : undefined,
    };
  }

  async function handleAdd(payload: { input: string; output: string }) {
    try {
      await addRecord.mutateAsync(parseRecordPayload(payload.input, payload.output));
      toast.success("Record added.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add record.");
    }
  }

  async function handleUpdate(recordId: string, payload: { input: string; output: string }) {
    try {
      await updateRecord.mutateAsync({
        recordId,
        ...parseRecordPayload(payload.input, payload.output),
      });
      toast.success("Record updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update record.");
    }
  }

  async function handleDelete(recordId: string) {
    try {
      await deleteRecord.mutateAsync(recordId);
      toast.success("Record deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete record.");
    }
  }

  async function handleBulkImport() {
    try {
      const parsed = JSON.parse(bulkJson) as
        | Array<{ input: unknown; output?: unknown; metadata?: Record<string, unknown> }>
        | { records: Array<{ input: unknown; output?: unknown; metadata?: Record<string, unknown> }> };
      const records = Array.isArray(parsed) ? parsed : parsed.records;
      if (!Array.isArray(records) || !records.length) {
        throw new Error("Provide a JSON array of records.");
      }
      const result = await bulkAdd.mutateAsync(records);
      toast.success(`Imported ${result.added} records.`);
      setBulkJson("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to bulk import records.");
    }
  }

  async function handleEmbed() {
    try {
      const result = await batchEmbed.mutateAsync(undefined);
      toast.success(`Generated embeddings for ${result.embedded} records.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate embeddings.");
    }
  }

  return (
    <WithPermission permission="ai.dataset.view">
      <ListPage
        title={
          datasetQuery.data?.name
            ? `${datasetQuery.data.name} · v${version?.versionNumber ?? "?"}`
            : "Dataset version"
        }
        subtitle="Manage records, bulk import, and generate embeddings for this version."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/datasets/${datasetId}`}>&larr; Dataset</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/datasets/${datasetId}/label`}>Label</Link>
            </Button>
            <IfHasPermission permission="ai.dataset.manage">
              <Button
                type="button"
                variant="secondary"
                disabled={batchEmbed.isPending}
                onClick={() => void handleEmbed()}
              >
                Generate embeddings
              </Button>
            </IfHasPermission>
          </div>
        }
        isLoading={datasetQuery.isLoading || recordsQuery.isLoading}
        isError={recordsQuery.isError}
        onRetry={() => void recordsQuery.refetch()}
        loadingRows={5}
      >
        <IfHasPermission permission="ai.dataset.manage">
          <div className="dataset-create-dialog">
            <h3>Bulk import records (JSON array)</h3>
            <textarea
              className="automation-select"
              value={bulkJson}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setBulkJson(event.target.value)}
              placeholder='[{"input":"example","output":"label"}]'
              rows={6}
            />
            <Button
              type="button"
              disabled={bulkAdd.isPending || !bulkJson.trim()}
              onClick={() => void handleBulkImport()}
            >
              Import records
            </Button>
          </div>
        </IfHasPermission>

        <DatasetRecordTable
          records={recordsQuery.data ?? []}
          isBusy={
            addRecord.isPending ||
            updateRecord.isPending ||
            deleteRecord.isPending ||
            recordsQuery.isFetching
          }
          canManage={canManage}
          onAdd={(payload) => void handleAdd(payload)}
          onUpdate={(recordId, payload) => void handleUpdate(recordId, payload)}
          onDelete={(recordId) => void handleDelete(recordId)}
        />
      </ListPage>
    </WithPermission>
  );
}
