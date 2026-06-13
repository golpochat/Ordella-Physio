"use client";

import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";
import { DatasetLabeler } from "@/components/ai/datasets/DatasetLabeler";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useAddDatasetLabel,
  useDataset,
  useDatasetRecords,
  useDatasetVersions,
} from "@/hooks/useDatasetPortal";
import { WithPermission } from "@/lib/auth/withPermission";

type DatasetLabelPageProps = {
  params: { id: string };
};

export default function DatasetLabelPage({ params }: DatasetLabelPageProps) {
  const datasetId = params.id;
  const datasetQuery = useDataset(datasetId);
  const versionsQuery = useDatasetVersions(datasetId);

  const latestVersion = useMemo(() => {
    const versions = versionsQuery.data ?? [];
    if (!versions.length) {
      return null;
    }
    return versions.reduce((latest, current) =>
      current.versionNumber > latest.versionNumber ? current : latest,
    );
  }, [versionsQuery.data]);

  const recordsQuery = useDatasetRecords(datasetId, latestVersion?.id ?? "");
  const addLabel = useAddDatasetLabel(datasetId, latestVersion?.id ?? "");

  async function handleSaveLabel(payload: {
    recordId: string;
    labelType: "CLASSIFICATION" | "EXTRACTION" | "CORRECTION";
    labelValue: Record<string, unknown>;
  }) {
    try {
      await addLabel.mutateAsync(payload);
      toast.success("Label saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save label.");
    }
  }

  return (
    <WithPermission permission="ai.dataset.label">
      <ListPage
        title={datasetQuery.data?.name ? `Label · ${datasetQuery.data.name}` : "Label dataset"}
        subtitle="Classify, extract, and correct records with keyboard shortcuts."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/datasets/${datasetId}`}>&larr; Dataset</Link>
            </Button>
            {latestVersion ? (
              <Button asChild variant="ghost">
                <Link href={`/clinic/ai/datasets/${datasetId}/versions/${latestVersion.id}`}>
                  Records (v{latestVersion.versionNumber})
                </Link>
              </Button>
            ) : null}
          </div>
        }
        isLoading={datasetQuery.isLoading || versionsQuery.isLoading || recordsQuery.isLoading}
        isError={recordsQuery.isError}
        onRetry={() => void recordsQuery.refetch()}
        loadingRows={3}
      >
        <DatasetLabeler
          records={recordsQuery.data ?? []}
          isSaving={addLabel.isPending}
          onSaveLabel={(payload) => void handleSaveLabel(payload)}
        />
      </ListPage>
    </WithPermission>
  );
}
