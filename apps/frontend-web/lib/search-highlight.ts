export function highlightSearchTerms(text: string, query: string) {
  const tokens = query
    .trim()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) {
    return [{ text, highlight: false }];
  }

  const pattern = new RegExp(`(${tokens.map(escapeRegex).join("|")})`, "ig");
  const parts = text.split(pattern).filter(Boolean);

  return parts.map((part) => ({
    text: part,
    highlight: tokens.some((token) => part.toLowerCase() === token.toLowerCase()),
  }));
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
