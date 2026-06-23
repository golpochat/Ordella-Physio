const EIRCODE_PATTERN = /^[A-Z]\d{2}[A-Z0-9]{4}$/i;

export function looksLikeEircode(value: string): boolean {
  const compact = value.replace(/\s+/g, "");
  return EIRCODE_PATTERN.test(compact);
}

/** Postcoder accepts Eircodes with or without a space; try common variants. */
export function eircodeSearchVariants(query: string): string[] {
  const trimmed = query.trim();
  const compact = trimmed.replace(/\s+/g, "").toUpperCase();

  if (!EIRCODE_PATTERN.test(compact)) {
    return [trimmed];
  }

  const spaced = `${compact.slice(0, 3)} ${compact.slice(3)}`;
  return [...new Set([trimmed, compact, spaced, compact.toLowerCase(), spaced.toLowerCase()])];
}
