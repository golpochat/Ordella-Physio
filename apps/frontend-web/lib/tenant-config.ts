export function getDefaultTenantId(): string | undefined {
  return process.env.DEFAULT_TENANT_ID ?? process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
}
