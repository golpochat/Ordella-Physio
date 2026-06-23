import type { PostalAddress } from "@/lib/postal-address";



export type AddressLookupSuggestion = {

  id: string;

  label: string;

  /** Populated for one-step providers (Postcoder). */

  address?: PostalAddress;

  /** Two-step providers (Ideal Postcodes) require resolve on select. */

  resolveRequired?: boolean;

};



export type AddressLookupProvider = "postcoder" | "ideal_postcodes" | "none";



export type AddressLookupConfig = {

  enabled: boolean;

  provider: AddressLookupProvider;

  minQueryLength: number;

  debounceMs?: number;

  eircodeEnabled?: boolean;

  /** When true, UI must call /api/address/resolve after the user picks a suggestion. */

  resolveOnSelect?: boolean;

};


