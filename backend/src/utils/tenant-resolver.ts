import { prisma } from "../lib/prisma";

export async function resolveTenantByIdOrSlug(identifier: string) {
  const byId = await prisma.tenant.findUnique({ where: { id: identifier } });
  if (byId) return byId;

  const bySlug = await prisma.tenant.findUnique({ where: { slug: identifier } });
  if (bySlug) return bySlug;

  const byCode = await prisma.tenant.findUnique({ where: { code: identifier } });
  if (byCode) return byCode;

  return null;
}
