export function buildPrimaryDomainName(tenantCode: string): string {
  const base = (process.env.TENANT_PRIMARY_DOMAIN_BASE ?? "ordella.app").replace(/^\.+|\.+$/g, "");
  const slug = tenantCode.trim().toLowerCase();
  return `${slug}.${base}`;
}

export function buildVerificationTxtName(domain: string): string {
  return `_verify.${domain}`;
}
