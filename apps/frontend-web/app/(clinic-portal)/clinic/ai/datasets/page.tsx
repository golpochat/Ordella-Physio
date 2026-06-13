"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DatasetList } from "@/components/ai/datasets/DatasetList";
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
import { IfHasPermission, WithPermission } from "@/lib/auth/withPermission";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import type { DatasetType } from "@/lib/dataset-types";

const DATASET_TYPES: DatasetType[] = ["TEXT", "JSON", "CONVERSATION", "EMBEDDING"];

export default function ClinicAiDatasetsPage() {
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
      const tags = tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      await createDataset.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        type,
        tags,
      });
      toast.success("Dataset created.");
      setShowCreate(false);
      setName("");
      setDescription("");
      setTagsText("");
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
        type: parsed.type ?? "JSON",
        tags: parsed.tags,
        records: parsed.records,
      });
      toast.success("Dataset imported.");
      setImportJson("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to import dataset.");
    }
  }

  async function handleClone(id: string) {
    try {
      await cloneDataset.mutateAsync(id);
      toast.success("Dataset cloned.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to clone dataset.");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this dataset and all versions?")) {
      return;
    }
    try {
      await deleteDataset.mutateAsync(id);
      toast.success("Dataset deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete dataset.");
    }
  }

  return (
    <WithPermission permission="ai.dataset.view">
      <ListPage
        title="AI Datasets"
        subtitle="Create, version, label, and export training data for AI pipelines."
        action={
          <IfHasPermission permission="ai.dataset.manage">
            <div className="automation-builder-actions">
              <Button type="button" variant="ghost" onClick={() => setShowCreate((value) => !value)}>
                {showCreate ? "Cancel" : "Create dataset"}
              </Button>
            </div>
          </IfHasPermission>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={5}
      >
        {showCreate ? (
          <div className="dataset-create-dialog">
            <div className="dataset-form-field">
              <label htmlFor="new-dataset-name" className="automation-form-section-title">
                Name
              </label>
              <Input
                id="new-dataset-name"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
              />
            </div>
            <div className="dataset-form-field">
              <label htmlFor="new-dataset-description" className="automation-form-section-title">
                Description
              </label>
              <textarea
                id="new-dataset-description"
                className="automation-select"
                value={description}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(event.target.value)
                }
                rows={2}
              />
            </div>
            <div className="dataset-form-field">
              <label htmlFor="new-dataset-type" className="automation-form-section-title">
                Type
              </label>
              <select
                id="new-dataset-type"
                className="automation-select"
                value={type}
                onChange={(event) => setType(event.target.value as DatasetType)}
              >
                {DATASET_TYPES.map((datasetType) => (
                  <option key={datasetType} value={datasetType}>
                    {datasetType}
                  </option>
                ))}
              </select>
            </div>
            <div className="dataset-form-field">
              <label htmlFor="new-dataset-tags" className="automation-form-section-title">
                Tags
              </label>
              <Input
                id="new-dataset-tags"
                value={tagsText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTagsText(event.target.value)}
                placeholder="training, qa"
              />
            </div>
            <Button
              type="button"
              disabled={createDataset.isPending || !name.trim()}
              onClick={() => void handleCreate()}
            >
              Create
            </Button>
          </div>
        ) : null}

        <IfHasPermission permission="ai.dataset.manage">
          <div className="dataset-create-dialog">
            <h3>Import dataset (JSON)</h3>
            <textarea
              className="automation-select"
              value={importJson}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setImportJson(event.target.value)}
              placeholder='{"name":"My dataset","type":"JSON","records":[{"input":"..."}]}'
              rows={5}
            />
            <Button
              type="button"
              variant="secondary"
              disabled={importDataset.isPending || !importJson.trim()}
              onClick={() => void handleImport()}
            >
              Import
            </Button>
          </div>
        </IfHasPermission>

        <DatasetList
          datasets={data ?? []}
          isBusy={isFetching || cloneDataset.isPending || deleteDataset.isPending}
          onClone={(id) => void handleClone(id)}
          onDelete={(id) => void handleDelete(id)}
          canManage={canManage}
        />
      </ListPage>
    </WithPermission>
  );
}
