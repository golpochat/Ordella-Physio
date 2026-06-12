"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteSavedReport, useUpdateSavedReport } from "@/hooks/useReports";
import { parseReportConfigErrors } from "@/lib/reporting-api-errors";
import type { SavedReport } from "@/lib/reporting-types";
import { savedReportOpenHref, savedReportTypeLabel } from "@/lib/saved-report-utils";

function formatDate(value: string): string {
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

function shortUserId(userId: string): string {
  if (userId.length <= 12) {
    return userId;
  }
  return `${userId.slice(0, 8)}…`;
}

type SavedReportsTableProps = {
  reports: SavedReport[];
  isLoading?: boolean;
};

export function SavedReportsTable({ reports, isLoading = false }: SavedReportsTableProps) {
  const router = useRouter();
  const deleteSavedReport = useDeleteSavedReport();
  const updateSavedReport = useUpdateSavedReport();
  const [editingReport, setEditingReport] = useState<SavedReport | null>(null);
  const [editName, setEditName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openEdit(report: SavedReport) {
    setEditingReport(report);
    setEditName(report.name);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteSavedReport.mutateAsync(id);
      toast.success("Saved report deleted.");
    } catch (error) {
      const parsed = parseReportConfigErrors(error, "Failed to delete saved report.");
      if (parsed.forbidden || parsed.tenantMismatch) {
        router.replace("/forbidden");
        return;
      }
      if (parsed.savedReportNotFound) {
        toast.error(parsed.generalError ?? "Saved report does not exist.");
        return;
      }
      toast.error(parsed.generalError ?? "Failed to delete saved report.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleRename(event: React.FormEvent) {
    event.preventDefault();
    if (!editingReport || !editName.trim()) {
      return;
    }

    try {
      await updateSavedReport.mutateAsync({
        id: editingReport.id,
        body: { name: editName.trim() },
      });
      toast.success("Saved report updated.");
      setEditingReport(null);
      setEditName("");
    } catch (error) {
      const parsed = parseReportConfigErrors(error, "Failed to update saved report.");
      if (parsed.forbidden || parsed.tenantMismatch) {
        router.replace("/forbidden");
        return;
      }
      toast.error(parsed.generalError ?? "Failed to update saved report.");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={["Name", "Type", "Created by", "Created at", "Actions"]}
        emptyMessage="No saved reports yet. Save a report from any advanced report page."
        isEmpty={reports.length === 0}
      >
        {reports.map((report) => (
          <Row key={report.id}>
            <span className="dashboard-cell">{report.name}</span>
            <span className="dashboard-cell">{savedReportTypeLabel(report.type)}</span>
            <span className="dashboard-cell">{shortUserId(report.createdByUserId)}</span>
            <span className="dashboard-cell">{formatDate(report.createdAt)}</span>
            <div className="user-list-actions">
              <Link href={savedReportOpenHref(report.type, report.config)} className="dashboard-link">
                Open
              </Link>
              <button type="button" className="dashboard-link" onClick={() => openEdit(report)}>
                Edit
              </button>
              <button
                type="button"
                className="dashboard-link"
                onClick={() => void handleDelete(report.id)}
                disabled={deletingId === report.id}
              >
                {deletingId === report.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </Row>
        ))}
      </DataTable>

      <Modal open={Boolean(editingReport)} onOpenChange={(open) => !open && setEditingReport(null)}>
        <ModalContent>
          <form onSubmit={(event) => void handleRename(event)}>
            <ModalHeader>
              <ModalTitle>Rename saved report</ModalTitle>
              <ModalDescription>Update the display name for this saved report.</ModalDescription>
            </ModalHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-saved-report-name">Name</Label>
                <Input
                  id="edit-saved-report-name"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  required
                  disabled={updateSavedReport.isPending}
                />
              </div>
            </div>
            <ModalFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingReport(null)}
                disabled={updateSavedReport.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateSavedReport.isPending || !editName.trim()}>
                {updateSavedReport.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
