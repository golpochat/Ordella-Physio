"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WorkflowRunTable } from "@/components/automation/WorkflowRunTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useAutomationWorkflowRuns, useAutomationWorkflows } from "@/hooks/useAutomationPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import type { WorkflowRunListFilters } from "@/lib/automation-types";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): WorkflowRunListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    workflowId: searchParams.get("workflowId")?.trim() || undefined,
    status: (searchParams.get("status")?.trim().toUpperCase() || undefined) as WorkflowRunListFilters["status"],
    from: searchParams.get("from")?.trim() || undefined,
    to: searchParams.get("to")?.trim() || undefined,
  };
}

function buildSearchParams(filters: WorkflowRunListFilters): URLSearchParams {
  const params = new URLSearchParams();
  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.workflowId) {
    params.set("workflowId", filters.workflowId);
  }
  if (filters.status) {
    params.set("status", filters.status);
  }
  if (filters.from) {
    params.set("from", filters.from);
  }
  if (filters.to) {
    params.set("to", filters.to);
  }

  return params;
}

export default function ClinicAutomationWorkflowHistoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);

  const { data, isLoading, isError, isFetching, refetch } = useAutomationWorkflowRuns(filters);
  const workflowsQuery = useAutomationWorkflows();

  function replaceFilters(next: WorkflowRunListFilters) {
    const params = buildSearchParams(next);
    router.replace(`${pathname}?${params.toString()}`);
  }

  const runs = data?.data ?? [];
  const pagination = data?.pagination ?? {
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  };

  return (
    <WithPermission permission="automation.view">
      <ListPage
        title="Workflow execution history"
        subtitle="Monitor recent workflow runs, failures, and executed actions."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/automation/workflows">&larr; Back to workflows</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <div className="automation-history-filters">
          <div className="tenant-create-form-field">
            <Label htmlFor="history-workflow">Workflow</Label>
            <select
              id="history-workflow"
              className="automation-select"
              value={filters.workflowId ?? ""}
              onChange={(event) =>
                replaceFilters({
                  ...filters,
                  page: 1,
                  workflowId: event.target.value || undefined,
                })
              }
            >
              <option value="">All workflows</option>
              {(workflowsQuery.data ?? []).map((workflow) => (
                <option key={workflow.id} value={workflow.id}>
                  {workflow.name}
                </option>
              ))}
            </select>
          </div>

          <div className="tenant-create-form-field">
            <Label htmlFor="history-status">Status</Label>
            <select
              id="history-status"
              className="automation-select"
              value={filters.status ?? ""}
              onChange={(event) =>
                replaceFilters({
                  ...filters,
                  page: 1,
                  status: (event.target.value || undefined) as WorkflowRunListFilters["status"],
                })
              }
            >
              <option value="">All statuses</option>
              <option value="SUCCESS">Success</option>
              <option value="FAILED">Failed</option>
              <option value="RUNNING">Running</option>
            </select>
          </div>

          <div className="tenant-create-form-field">
            <Label htmlFor="history-from">From</Label>
            <Input
              id="history-from"
              type="date"
              value={filters.from ?? ""}
              onChange={(event) =>
                replaceFilters({
                  ...filters,
                  page: 1,
                  from: event.target.value || undefined,
                })
              }
            />
          </div>

          <div className="tenant-create-form-field">
            <Label htmlFor="history-to">To</Label>
            <Input
              id="history-to"
              type="date"
              value={filters.to ?? ""}
              onChange={(event) =>
                replaceFilters({
                  ...filters,
                  page: 1,
                  to: event.target.value || undefined,
                })
              }
            />
          </div>
        </div>

        <WorkflowRunTable
          runs={runs}
          pagination={pagination}
          isBusy={isFetching}
          onPageChange={(page) => replaceFilters({ ...filters, page })}
        />
      </ListPage>
    </WithPermission>
  );
}
