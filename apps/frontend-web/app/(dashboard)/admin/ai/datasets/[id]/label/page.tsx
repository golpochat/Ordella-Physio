"use client";

import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";
import { AiAdminShell, DatasetLabeler } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useAddDatasetLabel,
  useDataset,
  useDatasetRecords,
  useDatasetVersions,
} from "@/hooks/useDatasetPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminDatasetLabelPage({ params }: Props) {
  const datasetId = params.id;
  const datasetQuery = useDataset(datasetId);
  const versionsQuery = useDatasetVersions(datasetId);
  const latestVersion = useMemo(() => {
    const versions = versionsQuery.data ?? [];
    return versions.length
      ? versions.reduce((latest, current) => (current.versionNumber > latest.versionNumber ? current : latest))
      : null;
  }, [versionsQuery.data]);
  const recordsQuery = useDatasetRecords(datasetId, latestVersion?.id ?? "");
  const addLabel = useAddDatasetLabel(datasetId, latestVersion?.id ?? "");

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title={datasetQuery.data?.name ?? "Label dataset"}
          subtitle="Classify, extract, or correct records in the latest version."
          action={<Button asChild variant="ghost"><Link href={adminAiPaths.dataset(datasetId)}>&larr; Dataset</Link></Button>}
          isLoading={datasetQuery.isLoading || recordsQuery.isLoading}
          isError={recordsQuery.isError}
          onRetry={() => void recordsQuery.refetch()}
          loadingRows={4}
        >
          <DatasetLabeler
            records={recordsQuery.data ?? []}
            isSaving={addLabel.isPending}
            onSaveLabel={(payload) =>
              void addLabel.mutateAsync(payload).then(() => toast.success("Label saved."))
            }
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
