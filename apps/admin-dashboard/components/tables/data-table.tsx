"use client";

import { DataTable as OrdellaDataTable } from "@ordella/ui";
import type { DataTableProps } from "@ordella/ui";

export function DataTable<TData, TValue = unknown>(props: DataTableProps<TData, TValue>) {
  return <OrdellaDataTable {...props} />;
}

export type { DataTableProps };
