"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useDeleteClinicPatientAttachment } from "@/hooks/useClinicPortal";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";
import { useUiStore } from "@/store/ui.store";
import { parsePatientAttachmentActionErrors } from "@/lib/clinic-patient-api-errors";
import { downloadAuthenticatedFile } from "@/lib/download-authenticated-file";
import type { ClinicPatientAttachment } from "@/lib/clinic-portal-types";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatCreatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatStaffLabel(staffId: string): string {
  if (staffId.length <= 10) {
    return staffId;
  }

  return `…${staffId.slice(-8)}`;
}

function formatFileType(fileType: string): string {
  if (fileType === "application/pdf") {
    return "PDF";
  }

  if (fileType.startsWith("image/")) {
    return fileType.replace("image/", "").toUpperCase();
  }

  if (fileType.includes("wordprocessingml")) {
    return "DOCX";
  }

  if (fileType === "application/msword") {
    return "DOC";
  }

  if (fileType === "text/plain") {
    return "TXT";
  }

  return fileType;
}

export type PatientAttachmentListProps = {
  patientId: string;
  attachments: ClinicPatientAttachment[];
  isBusy?: boolean;
  onChanged?: () => void;
};

export function PatientAttachmentList({
  patientId,
  attachments,
  isBusy = false,
  onChanged,
}: PatientAttachmentListProps) {
  const router = useRouter();
  const deleteAttachment = useDeleteClinicPatientAttachment(patientId);
  const accessToken = useAuthStore((state) => state.accessToken);
  const userTenantId = useAuthStore((state) => state.user?.tenantId);
  const tenantId = useTenantStore((state) => state.tenant?.id) ?? userTenantId;
  const correlationId = useUiStore((state) => state.correlationId);

  const [deleteTarget, setDeleteTarget] = useState<ClinicPatientAttachment | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const isDeleting = deleteAttachment.isPending;

  async function handleDownload(attachment: ClinicPatientAttachment) {
    setDownloadingId(attachment.id);
    try {
      await downloadAuthenticatedFile({
        service: "patient",
        path: `/${patientId}/attachments/${attachment.id}/download`,
        fileName: attachment.fileName,
        accessToken,
        tenantId,
        correlationId,
      });
    } catch {
      toast.error("Failed to download attachment.");
    } finally {
      setDownloadingId(null);
    }
  }

  function handleConfirmDelete() {
    if (!deleteTarget) {
      return;
    }

    deleteAttachment.mutate(deleteTarget.id, {
      onSuccess: (response) => {
        setDeleteTarget(null);
        toast.success(response.message ?? "Attachment deleted successfully.");
        onChanged?.();
      },
      onError: (error) => {
        const parsed = parsePatientAttachmentActionErrors(error);

        if (parsed.forbidden || parsed.tenantMismatch) {
          router.replace("/forbidden");
          return;
        }

        if (parsed.notFound) {
          toast.error(parsed.message ?? "Attachment does not exist.");
          setDeleteTarget(null);
          onChanged?.();
          return;
        }

        toast.error(parsed.message ?? "Failed to delete attachment.");
      },
    });
  }

  return (
    <div className="user-list-table">
      <DataTable
        columns={["File name", "Type", "Size", "Uploaded by", "Uploaded at", "Actions"]}
        grid="patientAttachmentsTable"
        emptyMessage="No attachments uploaded."
        isEmpty={attachments.length === 0}
      >
        {attachments.map((attachment) => (
          <Row key={attachment.id}>
            <div className="dashboard-cell-primary">{attachment.fileName}</div>
            <div className="dashboard-cell-muted">{formatFileType(attachment.fileType)}</div>
            <div className="dashboard-cell-muted">{formatFileSize(attachment.fileSize)}</div>
            <div className="dashboard-cell-muted">
              {formatStaffLabel(attachment.uploadedByStaffId)}
            </div>
            <div className="dashboard-cell-muted">{formatCreatedAt(attachment.createdAt)}</div>
            <div className="user-list-actions">
              <button
                type="button"
                className="dashboard-link"
                disabled={isBusy || downloadingId === attachment.id}
                onClick={() => void handleDownload(attachment)}
              >
                {downloadingId === attachment.id ? "Downloading..." : "Download"}
              </button>
              <button
                type="button"
                className="dashboard-link"
                disabled={isBusy || isDeleting}
                onClick={() => setDeleteTarget(attachment)}
              >
                Delete
              </button>
            </div>
          </Row>
        ))}
      </DataTable>

      <Modal open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Delete attachment</ModalTitle>
            <ModalDescription>
              Delete {deleteTarget?.fileName}? This action cannot be undone.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter className="gap-2 sm:gap-0">
            <Button variant="outline" disabled={isDeleting} onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={isDeleting} onClick={handleConfirmDelete}>
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
