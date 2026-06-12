"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { ClinicInvoiceListFilters, ClinicInvoiceListItem } from "@/lib/clinic-portal-types";
import { formatCurrency, formatPortalDateTime } from "@/lib/clinic-portal-utils";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<ClinicInvoiceListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "invoiceNumber", label: "Invoice #" },
  { key: "status", label: "Status" },
  { key: "subtotal", label: "Subtotal" },
  { key: "total", label: "Total" },
  { key: "createdAt", label: "Created" },
];

export type InvoiceListTableProps = {
  invoices: ClinicInvoiceListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: ClinicInvoiceListFilters["sortBy"];
  sortOrder?: ClinicInvoiceListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (
    sortBy: NonNullable<ClinicInvoiceListFilters["sortBy"]>,
    sortOrder: "asc" | "desc",
  ) => void;
};

export function InvoiceListTable({
  invoices,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: InvoiceListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<ClinicInvoiceListFilters["sortBy"]>) {
    if (!onSortChange) {
      return;
    }

    if (sortBy === column) {
      onSortChange(column, sortOrder === "asc" ? "desc" : "asc");
      return;
    }

    onSortChange(column, "asc");
  }

  return (
    <div className="user-list-table">
      {onSortChange ? (
        <div className="user-list-sort-controls">
          {SORTABLE_COLUMNS.map((column) => (
            <button
              key={column.key}
              type="button"
              className={cn(
                "user-list-sort-button",
                sortBy === column.key && "user-list-sort-button-active",
              )}
              disabled={isBusy}
              onClick={() => handleSort(column.key)}
            >
              {column.label}
              {sortBy === column.key ? (sortOrder === "asc" ? " ↑" : " ↓") : null}
            </button>
          ))}
        </div>
      ) : null}

      <DataTable
        columns={[
          "Invoice #",
          "Patient",
          "Staff",
          "Status",
          "Subtotal",
          "Tax",
          "Total",
          "Created",
          "Actions",
        ]}
        grid="invoiceTable"
        emptyMessage="No invoices found."
        isEmpty={invoices.length === 0}
      >
        {invoices.map((invoice) => {
          const canEdit = invoice.status !== "PAID" && invoice.status !== "VOIDED";

          return (
            <Row key={invoice.id}>
              <div className="dashboard-cell-primary">
                <Link href={`/billing/invoices/${invoice.id}`} className="dashboard-link">
                  {invoice.invoiceNumber}
                </Link>
              </div>
              <div>
                {invoice.patient.firstName} {invoice.patient.lastName}
              </div>
              <div>
                {invoice.staff
                  ? `${invoice.staff.firstName} ${invoice.staff.lastName}`
                  : "—"}
              </div>
              <div>
                <Badge variant="outline">{invoice.status}</Badge>
              </div>
              <div>{formatCurrency(invoice.subtotal, invoice.currency)}</div>
              <div>{formatCurrency(invoice.tax, invoice.currency)}</div>
              <div className="font-medium">{formatCurrency(invoice.total, invoice.currency)}</div>
              <div>{formatPortalDateTime(invoice.createdAt)}</div>
              <div className="dashboard-row-actions">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/billing/invoices/${invoice.id}`}>View</Link>
                </Button>
                {canEdit ? (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/billing/invoices/${invoice.id}/edit`}>Edit</Link>
                  </Button>
                ) : null}
              </div>
            </Row>
          );
        })}
      </DataTable>

      <div className="user-list-pagination">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} · {pagination.total} invoices
        </p>
        <div className="user-list-pagination-actions">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isBusy || currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isBusy || currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
