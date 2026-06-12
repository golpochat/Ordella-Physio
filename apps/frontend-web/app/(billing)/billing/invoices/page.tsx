"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { EntityIndexSearchBox } from "@/components/search/EntityIndexSearchBox";
import { InvoiceListFilters } from "@/components/billing/invoices/InvoiceListFilters";
import { InvoiceListTable } from "@/components/billing/invoices/InvoiceListTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/patient-portal/page-state";
import { useClinicInvoicesList } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseInvoiceListErrors } from "@/lib/invoice-api-errors";
import type { ClinicInvoiceListFilters } from "@/lib/clinic-portal-types";

const DEFAULT_LIMIT = 20;

function readFilters(searchParams: URLSearchParams): ClinicInvoiceListFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const search = searchParams.get("search")?.trim() || undefined;
  const patientId = searchParams.get("patientId")?.trim() || undefined;
  const staffId = searchParams.get("staffId")?.trim() || undefined;
  const status = (searchParams.get("status")?.trim().toUpperCase() || undefined) as
    | ClinicInvoiceListFilters["status"]
    | undefined;
  const dateStart = searchParams.get("dateStart")?.trim() || undefined;
  const dateEnd = searchParams.get("dateEnd")?.trim() || undefined;
  const minTotalRaw = searchParams.get("minTotal")?.trim();
  const maxTotalRaw = searchParams.get("maxTotal")?.trim();
  const sortBy = (searchParams.get("sortBy")?.trim() || undefined) as
    | ClinicInvoiceListFilters["sortBy"]
    | undefined;
  const sortOrder = (searchParams.get("sortOrder")?.trim().toLowerCase() || undefined) as
    | ClinicInvoiceListFilters["sortOrder"]
    | undefined;

  const minTotal =
    minTotalRaw !== undefined && minTotalRaw !== "" ? Number(minTotalRaw) : undefined;
  const maxTotal =
    maxTotalRaw !== undefined && maxTotalRaw !== "" ? Number(maxTotalRaw) : undefined;

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    search,
    patientId,
    staffId,
    status,
    dateStart,
    dateEnd,
    minTotal: Number.isFinite(minTotal) ? minTotal : undefined,
    maxTotal: Number.isFinite(maxTotal) ? maxTotal : undefined,
    sortBy,
    sortOrder,
  };
}

function buildSearchParams(filters: ClinicInvoiceListFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? DEFAULT_LIMIT));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.patientId) {
    params.set("patientId", filters.patientId);
  }

  if (filters.staffId) {
    params.set("staffId", filters.staffId);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.dateStart) {
    params.set("dateStart", filters.dateStart);
  }

  if (filters.dateEnd) {
    params.set("dateEnd", filters.dateEnd);
  }

  if (filters.minTotal !== undefined) {
    params.set("minTotal", String(filters.minTotal));
  }

  if (filters.maxTotal !== undefined) {
    params.set("maxTotal", String(filters.maxTotal));
  }

  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  if (filters.sortOrder) {
    params.set("sortOrder", filters.sortOrder);
  }

  return params;
}

export default function InvoicesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [draftSearch, setDraftSearch] = useState(filters.search ?? "");

  const { data, isLoading, isFetching, isError, error } = useClinicInvoicesList(filters);

  useEffect(() => {
    setDraftSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseInvoiceListErrors(error);
    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [error]);

  function replaceFilters(next: ClinicInvoiceListFilters) {
    const params = buildSearchParams(next);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleApplySearch() {
    replaceFilters({
      ...filters,
      page: 1,
      search: draftSearch.trim() || undefined,
    });
  }

  function handleReset() {
    setDraftSearch("");
    router.replace(pathname);
  }

  const isBusy = isLoading || isFetching;

  return (
    <WithPermission permission="billing.manage">
      <ListPage
        title="Invoices"
        subtitle="Search, filter, and manage patient invoices."
        action={
          <Button asChild>
            <Link href="/billing/invoices/new">Create invoice</Link>
          </Button>
        }
      >
        <EntityIndexSearchBox
          indexName="invoices"
          label="Index search"
          placeholder="Search by invoice number or patient name"
          detailHref={(id) => `/billing/invoices/${id}`}
        />

        <InvoiceListFilters
          filters={filters}
          draftSearch={draftSearch}
          disabled={isBusy}
          onDraftSearchChange={setDraftSearch}
          onApplySearch={handleApplySearch}
          onPatientChange={(patientId) =>
            replaceFilters({ ...filters, page: 1, patientId: patientId || undefined })
          }
          onStaffChange={(staffId) =>
            replaceFilters({ ...filters, page: 1, staffId: staffId || undefined })
          }
          onStatusChange={(status) =>
            replaceFilters({
              ...filters,
              page: 1,
              status: (status || undefined) as ClinicInvoiceListFilters["status"],
            })
          }
          onDateStartChange={(dateStart) =>
            replaceFilters({ ...filters, page: 1, dateStart: dateStart || undefined })
          }
          onDateEndChange={(dateEnd) =>
            replaceFilters({ ...filters, page: 1, dateEnd: dateEnd || undefined })
          }
          onMinTotalChange={(value) =>
            replaceFilters({
              ...filters,
              page: 1,
              minTotal: value === "" ? undefined : Number(value),
            })
          }
          onMaxTotalChange={(value) =>
            replaceFilters({
              ...filters,
              page: 1,
              maxTotal: value === "" ? undefined : Number(value),
            })
          }
          onReset={handleReset}
        />

        {isLoading ? <PageLoading rows={5} /> : null}

        {!isLoading && !isError && data ? (
          <InvoiceListTable
            invoices={data.data}
            pagination={data.pagination}
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            isBusy={isBusy}
            onPageChange={(page) => replaceFilters({ ...filters, page })}
            onSortChange={(sortBy, sortOrder) =>
              replaceFilters({ ...filters, page: 1, sortBy, sortOrder })
            }
          />
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
