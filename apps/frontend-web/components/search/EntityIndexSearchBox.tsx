"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { useSearchAutocomplete } from "@/hooks/useSearchIndex";
import type { SearchIndexName } from "@/lib/search-index-types";

type EntityIndexSearchBoxProps = {
  indexName: SearchIndexName;
  label: string;
  placeholder: string;
  detailHref: (id: string) => string;
};

export function EntityIndexSearchBox({
  indexName,
  label,
  placeholder,
  detailHref,
}: EntityIndexSearchBoxProps) {
  const [prefix, setPrefix] = useState("");
  const autocompleteQuery = useSearchAutocomplete(indexName, prefix, {
    enabled: prefix.trim().length >= 2,
    limit: 8,
  });

  const suggestions = useMemo(() => autocompleteQuery.data?.hits ?? [], [autocompleteQuery.data?.hits]);

  return (
    <div className="entity-index-search-box space-y-2">
      <Label htmlFor={`${indexName}-index-search`}>{label}</Label>
      <Input
        id={`${indexName}-index-search`}
        type="search"
        value={prefix}
        placeholder={placeholder}
        onChange={(event) => setPrefix(event.target.value)}
      />

      {prefix.trim().length >= 2 ? (
        <ul className="rounded-md border bg-background">
          {autocompleteQuery.isLoading ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">Searching…</li>
          ) : suggestions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">No indexed matches.</li>
          ) : (
            suggestions.map((hit) => {
              const displayLabel =
                typeof hit.label === "string"
                  ? hit.label
                  : [hit.firstName, hit.lastName].filter(Boolean).join(" ") || String(hit.id);

              return (
                <li key={String(hit.id)}>
                  <Link
                    href={detailHref(String(hit.id))}
                    className="block px-3 py-2 text-sm hover:bg-muted"
                  >
                    {displayLabel}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}
