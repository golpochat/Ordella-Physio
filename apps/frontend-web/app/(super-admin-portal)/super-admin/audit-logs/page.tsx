"use client";

import { useMemo, useState } from "react";
import { AuthAuditLogTable } from "@/components/audit/AuthAuditLogTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { AUTH_AUDIT_ACTIONS } from "@/lib/auth-audit-actions";
import type { AuthAuditLogFilters } from "@/lib/super-admin-portal-types";
import { useAuthAuditLogs, usePlatformTenants } from "@/hooks/useSuperAdminPortal";

const PAGE_SIZE = 25;

export default function SuperAdminAuditLogsPage() {
  const [filters, setFilters] = useState<AuthAuditLogFilters>({
    page: 1,
    limit: PAGE_SIZE,
  });
  const [draft, setDraft] = useState({
    userId: "",
    tenantId: "",
    action: "",
    from: "",
    to: "",
    search: "",
  });

  const { data, isLoading, isError, refetch } = useAuthAuditLogs(filters);
  const { data: tenants } = usePlatformTenants();

  const tenantNameById = useMemo(
    () => new Map((tenants ?? []).map((tenant) => [tenant.id, tenant.name])),
    [tenants],
  );

  const logs = data?.data ?? [];
  const total = data?.total ?? 0;
  const page = data?.page ?? filters.page ?? 1;
  const limit = data?.limit ?? filters.limit ?? PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  function applyFilters() {
    setFilters({
      page: 1,
      limit: PAGE_SIZE,
      userId: draft.userId.trim() || undefined,
      tenantId: draft.tenantId.trim() || undefined,
      action: draft.action || undefined,
      from: draft.from ? new Date(draft.from).toISOString() : undefined,
      to: draft.to ? new Date(draft.to).toISOString() : undefined,
      search: draft.search.trim() || undefined,
    });
  }

  function clearFilters() {
    setDraft({
      userId: "",
      tenantId: "",
      action: "",
      from: "",
      to: "",
      search: "",
    });
    setFilters({ page: 1, limit: PAGE_SIZE });
  }

  return (
    <ListPage
      title="Audit logs"
      subtitle="Authentication and security events across the platform."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <section className="audit-log-filters">
        <div className="audit-log-filters-grid">
          <div className="audit-log-filter-field">
            <Label htmlFor="audit-search">Search</Label>
            <Input
              id="audit-search"
              value={draft.search}
              onChange={(event) => setDraft((current) => ({ ...current, search: event.target.value }))}
              placeholder="Email, action, IP, user ID…"
            />
          </div>
          <div className="audit-log-filter-field">
            <Label htmlFor="audit-user-id">User ID</Label>
            <Input
              id="audit-user-id"
              value={draft.userId}
              onChange={(event) => setDraft((current) => ({ ...current, userId: event.target.value }))}
            />
          </div>
          <div className="audit-log-filter-field">
            <Label htmlFor="audit-tenant-id">Tenant ID</Label>
            <Input
              id="audit-tenant-id"
              value={draft.tenantId}
              onChange={(event) => setDraft((current) => ({ ...current, tenantId: event.target.value }))}
            />
          </div>
          <div className="audit-log-filter-field">
            <Label htmlFor="audit-action">Action</Label>
            <select
              id="audit-action"
              className="audit-log-select"
              value={draft.action}
              onChange={(event) => setDraft((current) => ({ ...current, action: event.target.value }))}
            >
              <option value="">All actions</option>
              {AUTH_AUDIT_ACTIONS.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
          <div className="audit-log-filter-field">
            <Label htmlFor="audit-from">From</Label>
            <Input
              id="audit-from"
              type="datetime-local"
              value={draft.from}
              onChange={(event) => setDraft((current) => ({ ...current, from: event.target.value }))}
            />
          </div>
          <div className="audit-log-filter-field">
            <Label htmlFor="audit-to">To</Label>
            <Input
              id="audit-to"
              type="datetime-local"
              value={draft.to}
              onChange={(event) => setDraft((current) => ({ ...current, to: event.target.value }))}
            />
          </div>
        </div>
        <div className="audit-log-filters-actions">
          <Button type="button" className="btn-primary" onClick={applyFilters}>
            Apply filters
          </Button>
          <Button type="button" variant="outline" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </section>

      <AuthAuditLogTable logs={logs} tenantNameById={tenantNameById} />

      {total > 0 ? (
        <nav className="audit-log-pagination" aria-label="Audit log pagination">
          <p className="sa-cell-muted">
            Page {page} of {totalPages} · {total} events
          </p>
          <div className="audit-log-pagination-actions">
            <Button
              type="button"
              variant="outline"
              disabled={page <= 1}
              onClick={() => setFilters((current) => ({ ...current, page: Math.max(1, page - 1) }))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setFilters((current) => ({ ...current, page: page + 1 }))}
            >
              Next
            </Button>
          </div>
        </nav>
      ) : null}
    </ListPage>
  );
}
