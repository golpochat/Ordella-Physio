"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useFederatedSearchAutocomplete } from "@/hooks/useSearchIndex";
import type { FederatedIndexName, SearchHit, SearchIndexName } from "@/lib/search-index-types";
import { cn } from "@/lib/cn";

const SEMANTIC_SEARCH_STORAGE_KEY = "ordella.semanticSearchEnabled";

const GROUPS: Array<{ key: FederatedIndexName; label: string }> = [
  { key: "patients", label: "Patients" },
  { key: "appointments", label: "Appointments" },
  { key: "invoices", label: "Invoices" },
  { key: "staff", label: "Staff" },
];

function resolveDetailHref(indexName: SearchIndexName, id: string) {
  switch (indexName) {
    case "patients":
      return `/clinic/patients/${id}`;
    case "appointments":
      return `/clinic/appointments/${id}`;
    case "invoices":
      return `/clinic/billing/${id}`;
    case "staff":
      return `/clinic/staff/${id}`;
    default:
      return `/clinic/search?indexName=${indexName}&q=${encodeURIComponent(id)}`;
  }
}

function hitLabel(hit: SearchHit) {
  if (typeof hit.label === "string") {
    return hit.label;
  }

  return [hit.firstName, hit.lastName].filter(Boolean).join(" ") || String(hit.id);
}

export function GlobalSearchBar() {
  const router = useRouter();
  const [prefix, setPrefix] = useState("");
  const [open, setOpen] = useState(false);
  const [semanticEnabled, setSemanticEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const federatedQuery = useFederatedSearchAutocomplete(prefix, open, semanticEnabled);

  useEffect(() => {
    const stored = window.localStorage.getItem(SEMANTIC_SEARCH_STORAGE_KEY);
    setSemanticEnabled(stored === "true");
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const grouped = useMemo(() => {
    const data = federatedQuery.data?.grouped;
    if (!data) {
      return [];
    }

    return GROUPS.map((group) => ({
      ...group,
      hits: (data[group.key] ?? []) as SearchHit[],
    })).filter((group) => group.hits.length > 0);
  }, [federatedQuery.data?.grouped]);

  function toggleSemantic() {
    const next = !semanticEnabled;
    setSemanticEnabled(next);
    window.localStorage.setItem(SEMANTIC_SEARCH_STORAGE_KEY, next ? "true" : "false");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = prefix.trim();
    if (!query) {
      return;
    }

    setOpen(false);
    const params = new URLSearchParams({ q: query });
    if (semanticEnabled) {
      params.set("semantic", "true");
    }
    router.push(`/clinic/search?${params.toString()}`);
  }

  return (
    <div ref={containerRef} className="global-search-bar relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-1">
        <Input
          type="search"
          className="topbar-search input"
          placeholder="Search patients, appointments, invoices…"
          aria-label="Global search"
          value={prefix}
          onChange={(event) => {
            setPrefix(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={semanticEnabled}
            onChange={toggleSemantic}
            className="h-3.5 w-3.5"
          />
          Smart search (semantic)
        </label>
        {semanticEnabled ? (
          <p className="text-xs text-muted-foreground">
            Results ranked by meaning, not just exact text.
          </p>
        ) : null}
      </form>

      {open && prefix.trim().length >= 2 ? (
        <div className="global-search-dropdown absolute z-50 mt-2 w-full rounded-md border bg-background shadow-lg">
          {federatedQuery.isLoading ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">Searching…</p>
          ) : grouped.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">No matches found.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto py-1">
              {grouped.map((group) => (
                <div key={group.key} className="global-search-group">
                  <p className="px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">
                    {group.label}
                  </p>
                  <ul>
                    {group.hits.map((hit) => (
                      <li key={`${group.key}-${hit.id}`}>
                        <Link
                          href={resolveDetailHref(group.key, String(hit.id))}
                          className={cn("block px-3 py-2 text-sm hover:bg-muted")}
                          onClick={() => setOpen(false)}
                        >
                          {hitLabel(hit)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
