"use client";



import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import { Input, Label } from "@/components/ui/input";

import {

  useAddressLookupConfig,

  useAddressSearchMinLength,

  useAddressSuggestions,

} from "@/hooks/useAddressLookup";

import { useDebounce } from "@/hooks/useDebounce";

import { ADDRESS_LOOKUP_DEBOUNCE_MS } from "@/lib/address-lookup/search-policy";
import {
  getCachedResolvedAddress,
  setCachedResolvedAddress,
} from "@/lib/address-lookup/resolve-cache";

import type { AddressLookupSuggestion } from "@/lib/address-lookup/types";

import type { PostalAddress } from "@/lib/postal-address";

import { postalCodeLabel } from "@/lib/postal-address";

import { cn } from "@/lib/cn";



type AddressLookupFieldProps = {

  country: string;

  disabled?: boolean;

  id?: string;

  onSelect: (address: PostalAddress) => void;

};



async function resolveSuggestionAddress(
  suggestion: AddressLookupSuggestion,
  country: string,
  searchQuery?: string,
): Promise<PostalAddress> {
  if (suggestion.address) {
    return suggestion.address;
  }

  const cached = getCachedResolvedAddress(suggestion.id, country, searchQuery);
  if (cached) {
    return cached;
  }

  const params = new URLSearchParams({
    id: suggestion.id,
    country: country.toUpperCase(),
  });

  if (searchQuery?.trim()) {
    params.set("q", searchQuery.trim());
  }

  const response = await fetch(`/api/address/resolve?${params.toString()}`, {
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    address?: PostalAddress;
    error?: string;
  };

  if (!response.ok || !payload.address) {
    throw new Error(payload.error ?? "Unable to resolve the selected address.");
  }

  setCachedResolvedAddress(suggestion.id, country, payload.address, searchQuery);
  return payload.address;
}



export function AddressLookupField({

  country,

  disabled = false,

  id = "address-lookup",

  onSelect,

}: AddressLookupFieldProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);

  const [resolvingId, setResolvingId] = useState<string | null>(null);

  const configQuery = useAddressLookupConfig();

  const debounceMs = configQuery.data?.debounceMs ?? ADDRESS_LOOKUP_DEBOUNCE_MS;

  const debouncedQuery = useDebounce(query, debounceMs);

  const minLength = useAddressSearchMinLength(query, country);

  const suggestionsQuery = useAddressSuggestions(debouncedQuery, country, open);

  const enabled = Boolean(configQuery.data?.enabled);

  const provider = configQuery.data?.provider ?? "none";



  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {

      if (!containerRef.current?.contains(event.target as Node)) {

        setOpen(false);

      }

    }



    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);



  if (!enabled) {

    return null;

  }



  const suggestions = suggestionsQuery.data?.suggestions ?? [];

  const lookupError = suggestionsQuery.data?.error;

  const eircodeDisabled =

    country.toUpperCase() === "IE" &&

    provider === "postcoder" &&

    configQuery.data?.eircodeEnabled === false;

  const trimmedQuery = query.trim();

  const isWaitingToSearch =

    open &&

    trimmedQuery.length > 0 &&

    (trimmedQuery !== debouncedQuery.trim() || trimmedQuery.length < minLength);

  const showDropdown = open && trimmedQuery.length >= 3;



  const lookupLabel =

    country.toUpperCase() === "IE" ? "Find address or Eircode" : `Find address or ${postalCodeLabel(country).toLowerCase()}`;

  const lookupPlaceholder =

    country.toUpperCase() === "IE"

      ? "Start typing street or Eircode…"

      : `Start typing street or ${postalCodeLabel(country).toLowerCase()}…`;



  async function handleSuggestionSelect(suggestion: AddressLookupSuggestion) {

    setResolvingId(suggestion.id);

    try {

      const address = await resolveSuggestionAddress(suggestion, country, trimmedQuery);

      onSelect(address);

      setQuery("");

      setOpen(false);

    } catch (error) {

      toast.error(error instanceof Error ? error.message : "Unable to apply the selected address.");

    } finally {

      setResolvingId(null);

    }

  }



  return (

    <div ref={containerRef} className="auth-field-stack relative">

      <Label htmlFor={id}>{lookupLabel}</Label>

      <Input

        id={id}

        type="search"

        autoComplete="off"

        disabled={disabled || Boolean(resolvingId)}

        placeholder={lookupPlaceholder}

        value={query}

        onChange={(event) => {

          setQuery(event.target.value);

          setOpen(true);

        }}

        onFocus={() => setOpen(true)}

      />

      {eircodeDisabled ? (

        <p className="text-xs text-amber-700">

          Eircode lookup is not enabled on your Postcoder plan yet. Search by street name, or enter

          your address manually below.

        </p>

      ) : (

        <p className="text-xs text-muted-foreground">

          Pause briefly while typing — we search after you stop, not on every keystroke.

          {provider === "ideal_postcodes" ? " Selecting an address completes the lookup." : null}

        </p>

      )}



      {showDropdown ? (

        <div

          className={cn(

            "absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-md border bg-background shadow-lg",

          )}

          role="listbox"

          aria-label="Address suggestions"

        >

          {isWaitingToSearch ? (

            <p className="px-3 py-2 text-sm text-muted-foreground">

              {trimmedQuery.length < minLength

                ? `Type at least ${minLength} characters to search.`

                : "Waiting for you to finish typing…"}

            </p>

          ) : null}



          {!isWaitingToSearch && suggestionsQuery.isFetching ? (

            <p className="px-3 py-2 text-sm text-muted-foreground">Searching…</p>

          ) : null}



          {!isWaitingToSearch && !suggestionsQuery.isFetching && lookupError ? (

            <p className="px-3 py-2 text-sm text-amber-800">{lookupError}</p>

          ) : null}



          {!isWaitingToSearch &&

          !suggestionsQuery.isFetching &&

          !lookupError &&

          suggestions.length === 0 &&

          trimmedQuery.length >= minLength ? (

            <p className="px-3 py-2 text-sm text-muted-foreground">

              {eircodeDisabled

                ? "Eircode search needs Postcoder Eircode access. Try your street name instead."

                : "No matches found."}

            </p>

          ) : null}



          {suggestions.map((suggestion) => (

            <button

              key={suggestion.id}

              type="button"

              role="option"

              disabled={Boolean(resolvingId)}

              className="block w-full px-3 py-2 text-left text-sm hover:bg-muted disabled:opacity-60"

              onMouseDown={(event) => {

                event.preventDefault();

                void handleSuggestionSelect(suggestion);

              }}

            >

              {resolvingId === suggestion.id ? "Applying address…" : suggestion.label}

            </button>

          ))}

        </div>

      ) : null}

    </div>

  );

}


