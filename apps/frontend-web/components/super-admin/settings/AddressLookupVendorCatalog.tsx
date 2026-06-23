"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import {
  ADDRESS_LOOKUP_VENDOR_CATALOG,
  type AddressLookupVendorCatalogEntry,
} from "@/lib/address-lookup/vendor-catalog";
import type { AddressLookupVendor } from "@/lib/super-admin-portal-types";

type AddressLookupVendorCatalogProps = {
  selectedVendor: AddressLookupVendor;
  onSelect: (vendor: AddressLookupVendor) => void;
};

function VendorCatalogCard({
  entry,
  selected,
  onSelect,
}: {
  entry: AddressLookupVendorCatalogEntry;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-md border p-4 text-left transition-colors",
        selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/40",
      )}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-medium">{entry.name}</p>
        {entry.recommended ? (
          <Badge variant="secondary">{entry.recommendedLabel ?? "Recommended"}</Badge>
        ) : null}
      </div>
      <p className="dashboard-cell-muted mt-2 text-sm">{entry.description}</p>
      <dl className="mt-3 space-y-1 text-sm">
        <div>
          <dt className="dashboard-cell-muted inline">Countries: </dt>
          <dd className="inline">{entry.countries.join(", ")}</dd>
        </div>
        <div>
          <dt className="dashboard-cell-muted inline">Billing: </dt>
          <dd className="inline">{entry.billingModel}</dd>
        </div>
        <div>
          <dt className="dashboard-cell-muted inline">Flow: </dt>
          <dd className="inline">{entry.flowLabel}</dd>
        </div>
      </dl>
    </button>
  );
}

export function AddressLookupVendorCatalog({
  selectedVendor,
  onSelect,
}: AddressLookupVendorCatalogProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="label">Provider</p>
        <p className="dashboard-cell-muted text-sm">
          Choose a supported address API adapter. New providers are added by engineering when an
          integration is built.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {ADDRESS_LOOKUP_VENDOR_CATALOG.map((entry) => (
          <VendorCatalogCard
            key={entry.id}
            entry={entry}
            selected={selectedVendor === entry.id}
            onSelect={() => onSelect(entry.id)}
          />
        ))}
      </div>
    </div>
  );
}

export { ADDRESS_LOOKUP_VENDOR_CATALOG };
