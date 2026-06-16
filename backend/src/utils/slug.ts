export function slugifyClinicName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function tenantCodeFromSlug(slug: string): string {
  const base = slug.replace(/-/g, "").toUpperCase().slice(0, 8);
  const suffix = Date.now().toString(36).slice(-4).toUpperCase();
  return `${base || "CLINIC"}${suffix}`;
}

export async function uniqueTenantSlug(
  baseSlug: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> {
  let candidate = baseSlug || "clinic";
  let attempt = 0;

  while (await exists(candidate)) {
    attempt += 1;
    candidate = `${baseSlug}-${attempt}`;
  }

  return candidate;
}
