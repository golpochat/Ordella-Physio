"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/data-table";
import { billingApi } from "@/lib/api";
import type { Invoice } from "@/lib/schemas";

const columns: ColumnDef<Invoice>[] = [
  { accessorKey: "invoiceNumber", header: "Invoice #" },
  { accessorKey: "patientId", header: "Patient" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "total", header: "Total" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Link className="text-primary underline" href={`/billing/invoices/${row.original.id}`}>View</Link>,
  },
];

export default function BillingPage() {
  const { data, isLoading } = useQuery({ queryKey: ["invoices"], queryFn: () => billingApi.listInvoices() });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground">Invoices and billing operations</p>
        </div>
        <Button>Create invoice</Button>
      </div>
      <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} searchColumn="invoiceNumber" />
    </div>
  );
}
