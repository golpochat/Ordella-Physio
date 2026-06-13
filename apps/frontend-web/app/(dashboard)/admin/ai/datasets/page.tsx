"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AiAdminShell, DatasetTable } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCloneDataset,
  useCreateDataset,
  useDatasets,
  useDeleteDataset,
  useImportDataset,
} from "@/hooks/useDatasetPortal";
import { ADMIN_AI_BASE } from "@/lib/ai-admin-paths";
import { IfHasPermission, WithPermission } from "@/lib/auth/withPermission";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import type { DatasetType } from "@/lib/dataset-types";

const DATASET_TYPES: DatasetType[] = ["TEXT", "JSON", "CONVERSATION", "EMBEDDING"];

export default function AdminAiDatasetsPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.dataset.manage");
  const { data, isLoading, isError, isFetching, refetch } = useDatasets();
  const createDataset = useCreateDataset();
  const cloneDataset = useCloneDataset();
  const deleteDataset = useDeleteDataset();
  const importDataset = useImportDataset();
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<DatasetType>("TEXT");
  const [tagsText, setTagsText] = useState("");
  const [importJson, setImportJson] = useState("");

  async function handleCreate() {
    try {
      await createDataset.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        type,
        tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
      });
      toast.success("Dataset created.");
      setShowCreate(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create dataset.");
    }
  }

  async function handleImport() {
    try {
      const parsed = JSON.parse(importJson) as {
        name: string;
        description?: string;
        type?: DatasetType;
        tags?: string[];
        records?: Array<{ input: unknown; output?: unknown }>;
      };
      await importDataset.mutateAsync({
        name: parsed.name,
        description: parsed.description,
        type: parsed.type ?? "TEXT",
        tags: parsed.tags,
        records: parsed.records,
      });
      toast.success("Dataset imported.");
      setImportJson("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to import dataset.");
    }
  }

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI Datasets"
          subtitle="Create, version, label, and export training data."
          action={
            <IfHasPermission permission="ai.dataset.manage">
              <Button type="button" variant="ghost" onClick={() => setShowCreate((value) => !value)}>
                {showCreate ? "Cancel" : "Create dataset"}
              </Button>
            </IfHasPermission>
          }
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
          loadingRows={5}
        >
          {showCreate ? (
            <div className="dataset-create-dialog">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dataset name" />
              <textarea className="automation-select" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
              <select className="automation-select" value={type} onChange={(e) => setType(e.target.value as DatasetType)}>
                {DATASET_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <Button type="button" disabled={!name.trim() || createDataset.isPending} onClick={() => void handleCreate()}>
                Create
              </Button>
            </div>
          ) : null}
          <IfHasPermission permission="ai.dataset.manage">
            <div className="dataset-create-dialog">
              <h3>Import dataset (JSON)</h3>
              <textarea className="automation-select" value={importJson} onChange={(e) => setImportJson(e.target.value)} rows={4} />
              <Button type="button" variant="secondary" disabled={!importJson.trim()} onClick={() => void handleImport()}>
                Import
              </Button>
            </div>
          </IfHasPermission>
          <DatasetTable
            datasets={data ?? []}
            basePath={ADMIN_AI_BASE}
            canManage={canManage}
            isBusy={isFetching}
            onClone={(id) => void cloneDataset.mutateAsync(id)}
            onDelete={(id) => void deleteDataset.mutateAsync(id)}
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
