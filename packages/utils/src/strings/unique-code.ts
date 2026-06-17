import { slugify } from "./slug";

/**
 * Derives a stable lowercase hyphenated code from a display name.
 */
export function codeFromName(name: string): string {
  const slug = slugify(name);
  return slug || "entity";
}

/**
 * Generates a unique code by appending numeric suffixes when collisions occur.
 */
export async function generateUniqueCode(
  name: string,
  exists: (code: string) => Promise<boolean>,
): Promise<string> {
  const base = codeFromName(name);
  let candidate = base;
  let suffix = 2;

  while (await exists(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}
