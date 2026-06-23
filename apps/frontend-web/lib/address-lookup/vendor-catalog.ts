import type { AddressLookupVendor } from "@/lib/super-admin-portal-types";

export type AddressLookupVendorCatalogEntry = {
  id: AddressLookupVendor;
  name: string;
  description: string;
  countries: string[];
  billingModel: string;
  flow: "one-step" | "two-step";
  flowLabel: string;
  recommended?: boolean;
  recommendedLabel?: string;
};

export const ADDRESS_LOOKUP_VENDOR_CATALOG: AddressLookupVendorCatalogEntry[] = [
  {
    id: "ideal_postcodes",
    name: "Ideal Postcodes",
    description: "Ireland and UK address autocomplete with Eircode support.",
    countries: ["Ireland", "United Kingdom"],
    billingModel: "Bills when a user selects an address",
    flow: "two-step",
    flowLabel: "Suggest, then resolve on select",
    recommended: true,
    recommendedLabel: "Recommended for Ireland",
  },
  {
    id: "postcoder",
    name: "Postcoder",
    description: "Multi-country address search. Eircode depends on your Postcoder plan.",
    countries: ["Ireland", "United Kingdom"],
    billingModel: "Bills on every search request",
    flow: "one-step",
    flowLabel: "Full address returned in search results",
  },
];

export function getAddressLookupVendorCatalogEntry(
  vendor: AddressLookupVendor,
): AddressLookupVendorCatalogEntry | undefined {
  return ADDRESS_LOOKUP_VENDOR_CATALOG.find((entry) => entry.id === vendor);
}

export function addressLookupVendorLabel(vendor: AddressLookupVendor): string {
  return getAddressLookupVendorCatalogEntry(vendor)?.name ?? vendor;
}
