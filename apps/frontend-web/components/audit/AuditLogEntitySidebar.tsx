"use client";

import Link from "next/link";
import { X } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import type { DomainAuditLogRecord } from "@/lib/audit-types";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";
import { formatRelativeAuditTime, getAuditActionClass, getEntityDetailHref } from "@/lib/audit-utils";
import { cn } from "@/lib/cn";

type AuditLogEntitySidebarProps = {
  selectedLog: DomainAuditLogRecord | null;
  actorLabel?: string;
  onClose: () => void;
};

function formatMetadata(metadata: Record<string, unknown> | null): string {
  if (!metadata || Object.keys(metadata).length === 0) {
    return "—";
  }

  return JSON.stringify(metadata, null, 2);
}

export function AuditLogEntitySidebar({
  selectedLog,
  actorLabel,
  onClose,
}: AuditLogEntitySidebarProps) {
  if (!selectedLog) {
    return null;
  }

  const entityHref = getEntityDetailHref(selectedLog.entityType, selectedLog.entityId);
  const actorName = actorLabel ?? selectedLog.actorUserId;

  return (
    <>
      <button
        type="button"
        className="audit-log-sidebar-backdrop"
        aria-label="Close audit log details"
        onClick={onClose}
      />
      <aside className="audit-log-sidebar" aria-label="Audit log details">
        <div className="audit-log-sidebar-header">
          <h2 className="audit-log-sidebar-title">Audit event</h2>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <dl className="audit-log-sidebar-body">
          <div className="audit-log-sidebar-field">
            <dt>Actor</dt>
            <dd>
              <p className="audit-log-sidebar-primary">{actorName}</p>
              {selectedLog.actorRole ? (
                <p className="audit-log-sidebar-muted">{selectedLog.actorRole}</p>
              ) : null}
            </dd>
          </div>

          <div className="audit-log-sidebar-field">
            <dt>Timestamp</dt>
            <dd>
              <p className="audit-log-sidebar-primary">
                {formatRelativeAuditTime(selectedLog.createdAt)}
              </p>
              <p className="audit-log-sidebar-muted" title={formatPortalDateTime(selectedLog.createdAt)}>
                {formatPortalDateTime(selectedLog.createdAt)}
              </p>
            </dd>
          </div>

          <div className="audit-log-sidebar-field">
            <dt>Entity</dt>
            <dd>
              <p className="audit-log-sidebar-primary">
                {selectedLog.entityType} · {selectedLog.entityId}
              </p>
              {entityHref ? (
                <Link href={entityHref} className="audit-log-sidebar-link">
                  View {selectedLog.entityType.toLowerCase()}
                </Link>
              ) : null}
            </dd>
          </div>

          <div className="audit-log-sidebar-field">
            <dt>Action</dt>
            <dd>
              <span className={cn("audit-action-badge", getAuditActionClass(selectedLog.action))}>
                {selectedLog.action}
              </span>
            </dd>
          </div>

          {selectedLog.ipAddress ? (
            <div className="audit-log-sidebar-field">
              <dt>IP address</dt>
              <dd className="audit-log-sidebar-muted">{selectedLog.ipAddress}</dd>
            </div>
          ) : null}

          {selectedLog.userAgent ? (
            <div className="audit-log-sidebar-field">
              <dt>User agent</dt>
              <dd className="audit-log-sidebar-muted audit-log-user-agent">{selectedLog.userAgent}</dd>
            </div>
          ) : null}

          <div className="audit-log-sidebar-field">
            <dt>Metadata</dt>
            <dd>
              <pre className="audit-log-metadata-body">{formatMetadata(selectedLog.metadata)}</pre>
            </dd>
          </div>
        </dl>
      </aside>
    </>
  );
}
