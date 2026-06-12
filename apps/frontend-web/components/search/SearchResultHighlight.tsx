"use client";

import { highlightSearchTerms } from "@/lib/search-highlight";

type SearchResultHighlightProps = {
  text: string;
  query: string;
};

export function SearchResultHighlight({ text, query }: SearchResultHighlightProps) {
  const parts = highlightSearchTerms(text, query);

  return (
    <span>
      {parts.map((part, index) =>
        part.highlight ? (
          <mark key={`${part.text}-${index}`} className="search-hit-highlight rounded px-0.5">
            {part.text}
          </mark>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </span>
  );
}
