"use client";



import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/super-admin/layout/DataTable";

import { PageLoading } from "@/components/patient-portal/page-state";

import { FilePreview } from "@/components/files/FilePreview";

import { FileThumbnail } from "@/components/files/FileThumbnail";

import {

  useFileAccessUrl,

  useFileVersions,

  useFiles,

  useHardDeleteFile,

  useSoftDeleteFile,

} from "@/hooks/useFiles";

import { IfHasPermission } from "@/lib/auth/withPermission";

import { parseFileApiError } from "@/lib/file-api-errors";

import { formatPortalDateTime } from "@/lib/clinic-portal-utils";

import { cn } from "@/lib/cn";

import type { StoredFileRecord } from "@/lib/file-types";



type FileListProps = {

  entityType: string;

  entityId: string;

  readOnly?: boolean;

  includeDeleted?: boolean;

  onChanged?: () => void;

};



type FileListTab = "files" | "versions";



function formatFileSize(bytes: number): string {

  if (bytes < 1024) {

    return `${bytes} B`;

  }



  if (bytes < 1024 * 1024) {

    return `${(bytes / 1024).toFixed(1)} KB`;

  }



  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

}



function FileVersionsPanel({

  fileId,

  onDownload,

}: {

  fileId: string;

  onDownload: (fileId: string) => void;

}) {

  const versionsQuery = useFileVersions(fileId);



  if (versionsQuery.isLoading) {

    return <PageLoading rows={3} />;

  }



  const versions = versionsQuery.data?.data ?? [];



  if (versions.length === 0) {

    return <p className="text-sm text-muted-foreground">No version history available.</p>;

  }



  return (

    <DataTable

      columns={["Version", "Filename", "Provider", "Uploaded at", ""]}

      emptyMessage="No versions found."

      isEmpty={versions.length === 0}

      grid="default"

      className="file-versions-table"

    >

      {versions.map((version) => (

        <article key={version.id} className="table-row grid-baseline row">

          <p className="sa-cell-primary">v{version.version}</p>

          <p className="sa-cell-muted">{version.filename}</p>

          <p className="sa-cell-muted">{version.storageProvider}</p>

          <p className="sa-cell-muted">{formatPortalDateTime(version.createdAt)}</p>

          <div>

            <Button

              type="button"

              variant="outline"

              size="sm"

              onClick={() => onDownload(version.id)}

            >

              Download

            </Button>

          </div>

        </article>

      ))}

    </DataTable>

  );

}



export function FileList({

  entityType,

  entityId,

  readOnly = false,

  includeDeleted = true,

  onChanged,

}: FileListProps) {

  const router = useRouter();

  const [activeTab, setActiveTab] = useState<FileListTab>("files");

  const [previewFile, setPreviewFile] = useState<StoredFileRecord | null>(null);

  const [versionsFileId, setVersionsFileId] = useState<string | null>(null);



  const filesQuery = useFiles({

    entityType,

    entityId,

    page: 1,

    limit: 50,

    includeDeleted,

  });

  const accessUrlMutation = useFileAccessUrl();

  const softDeleteMutation = useSoftDeleteFile();

  const hardDeleteMutation = useHardDeleteFile();



  useEffect(() => {

    if (!filesQuery.error) {

      return;

    }



    const parsed = parseFileApiError(filesQuery.error);

    if (parsed.redirectForbidden) {

      router.replace("/forbidden");

      return;

    }



    if (parsed.toastError) {

      toast.error(parsed.toastError);

    }

  }, [filesQuery.error, router]);



  async function handleOpen(fileId: string) {

    try {

      const result = await accessUrlMutation.mutateAsync(fileId);

      window.open(result.url, "_blank", "noopener,noreferrer");

    } catch (error) {

      const parsed = parseFileApiError(error);

      if (parsed.redirectForbidden) {

        router.replace("/forbidden");

        return;

      }

      toast.error(parsed.toastError ?? "Unable to open file.");

    }

  }



  async function handleSoftDelete(fileId: string) {

    try {

      const result = await softDeleteMutation.mutateAsync(fileId);

      toast.success(result.message ?? "File deleted.");

      await filesQuery.refetch();

      onChanged?.();

    } catch (error) {

      const parsed = parseFileApiError(error);

      toast.error(parsed.toastError ?? "Unable to delete file.");

    }

  }



  async function handleHardDelete(fileId: string) {

    try {

      const result = await hardDeleteMutation.mutateAsync(fileId);

      toast.success(result.message ?? "File permanently deleted.");

      await filesQuery.refetch();

      onChanged?.();

    } catch (error) {

      const parsed = parseFileApiError(error);

      toast.error(parsed.toastError ?? "Unable to permanently delete file.");

    }

  }



  function openVersions(fileId: string) {

    setVersionsFileId(fileId);

    setActiveTab("versions");

  }



  const files = filesQuery.data?.data ?? [];

  const isBusy =

    accessUrlMutation.isPending || softDeleteMutation.isPending || hardDeleteMutation.isPending;



  if (filesQuery.isLoading) {

    return <PageLoading rows={4} />;

  }



  return (

    <div className="file-list space-y-4">

      <div className="flex flex-wrap gap-2">

        <Button

          type="button"

          variant={activeTab === "files" ? "primary" : "outline"}

          size="sm"

          onClick={() => setActiveTab("files")}

        >

          Files

        </Button>

        <Button

          type="button"

          variant={activeTab === "versions" ? "primary" : "outline"}

          size="sm"

          onClick={() => setActiveTab("versions")}

          disabled={!versionsFileId}

        >

          Versions

        </Button>

      </div>



      {activeTab === "versions" && versionsFileId ? (

        <FileVersionsPanel fileId={versionsFileId} onDownload={(fileId) => void handleOpen(fileId)} />

      ) : null}



      {activeTab === "files" ? (

        <DataTable

          columns={["", "Filename", "Size", "Uploaded by", "Uploaded at", ""]}

          emptyMessage="No files uploaded yet."

          isEmpty={files.length === 0}

          grid="default"

          className="file-list-table"

        >

          {files.map((file) => (

            <article key={file.id} className="table-row grid-baseline row file-list-row">

              <div>

                {!file.isDeleted ? (

                  <FileThumbnail file={file} onClick={() => setPreviewFile(file)} />

                ) : (

                  <FileThumbnail file={file} />

                )}

              </div>

              <div className="space-y-1">

                <p className={cn("sa-cell-primary", file.isDeleted && "line-through opacity-70")}>

                  {file.filename}

                </p>

                {file.isDeleted ? (

                  <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">

                    Deleted

                  </span>

                ) : null}

                {file.version > 1 ? (

                  <p className="text-xs text-muted-foreground">Version {file.version}</p>

                ) : null}

                {file.expiresAt ? (

                  <p className="text-xs text-muted-foreground">

                    Expires {formatPortalDateTime(file.expiresAt)}

                  </p>

                ) : null}

              </div>

              <p className="sa-cell-muted">{formatFileSize(file.sizeBytes)}</p>

              <p className="sa-cell-muted">{file.ownerUserId}</p>

              <p className="sa-cell-muted">{formatPortalDateTime(file.createdAt)}</p>

              <div className="file-list-actions flex flex-wrap gap-2">

                {!file.isDeleted ? (

                  <Button

                    type="button"

                    variant="outline"

                    size="sm"

                    disabled={isBusy}

                    onClick={() => void handleOpen(file.id)}

                  >

                    Open

                  </Button>

                ) : null}

                {!readOnly && !file.isDeleted ? (

                  <Button

                    type="button"

                    variant="outline"

                    size="sm"

                    disabled={isBusy}

                    onClick={() => openVersions(file.id)}

                  >

                    Versions

                  </Button>

                ) : null}

                {!readOnly && !file.isDeleted ? (

                  <IfHasPermission permission="files.delete">

                    <Button

                      type="button"

                      variant="outline"

                      size="sm"

                      disabled={isBusy}

                      onClick={() => void handleSoftDelete(file.id)}

                    >

                      Delete

                    </Button>

                  </IfHasPermission>

                ) : null}

                {!readOnly && file.isDeleted ? (

                  <IfHasPermission permission="files.delete.hard">

                    <Button

                      type="button"

                      variant="destructive"

                      size="sm"

                      disabled={isBusy}

                      onClick={() => void handleHardDelete(file.id)}

                    >

                      Permanently delete

                    </Button>

                  </IfHasPermission>

                ) : null}

              </div>

            </article>

          ))}

        </DataTable>

      ) : null}



      <FilePreview

        file={previewFile}

        open={Boolean(previewFile)}

        onOpenChange={(open) => {

          if (!open) {

            setPreviewFile(null);

          }

        }}

      />

    </div>

  );

}


